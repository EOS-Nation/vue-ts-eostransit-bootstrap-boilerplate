import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import i18n from '@/i18n'
import { VotersTable } from '@/types/proxy'
import { vxm } from '@/store'

@Module({ namespacedPath: 'core/' })
export class CoreModule extends VuexModule {
  @getter language: string = 'en'
  @getter voters: VotersTable[] = []
  @getter userSignedUp: VotersTable | false = false

  get userState() {
    if (!vxm.eosTransit.isAuthenticated) return 'auth'
    else if (!this.userProxy || typeof this.userProxy === 'string')
      return 'proxy'
    else if (!this.userSignedUp) return 'signup'
    else return 'claim'
  }

  get userProxy() {
    const isAuthenticated = vxm.eosTransit.isAuthenticated
    if (!isAuthenticated) return false
    else {
      // @ts-ignore
      const user = vxm.eosTransit.wallet.accountInfo
      if (user.voter_info) {
        if (user.voter_info.proxy === 'proxy4nation') return true
        else if (user.voter_info.proxy) return user.voter_info.proxy
        else return false
      } else return false
    }
  }

  @action async getVoters() {
    let table: VotersTable[] = []
    let more = true
    let offset = 0
    const limit = 100
    while (more) {
      const resp = await vxm.eosTransit.accessContext.eosRpc.get_table_rows({
        code: 'proxy4nation',
        table: 'voters',
        scope: 'proxy4nation',
        lower_bound: offset,
        limit: limit
      })
      offset += limit
      if (resp.rows.length) {
        table = table.concat(resp.rows)
      }
      if (resp && !resp.more) more = false
    }
    this.setVoters(table)
  }
  @action async checkSignup() {
    const user = vxm.eosTransit.isAuthenticated
    const resp = await vxm.eosTransit.accessContext.eosRpc.get_table_rows({
      code: 'proxy4nation',
      table: 'voters',
      scope: 'proxy4nation',
      lower_bound: user,
      upper_bound: user,
      limit: 1
    })
    if (resp && resp.rows.length) this.setUserSigned(resp.rows[0])
  }

  @action async claim(a: { vote: boolean, signup: boolean, claim: boolean }) {
    const wallet = vxm.eosTransit.wallet
    const actions: any[] = []
    let resp: any
    if (wallet && wallet.auth) {
      const user = wallet.auth.accountName
      const claim = {
        account: 'proxy4nation',
        name: 'claim',
        authorization: [
          {
            actor: user,
            permission: wallet.auth.permission
          }
        ],
        data: {
          owner: user
        }
      }
      const vote = {
        account: 'eosio',
        name: 'voteproducer',
        authorization: [
          {
            actor: user,
            permission: wallet.auth.permission
          }
        ],
        data: {
          voter: user,
          proxy: 'proxy4nation',
          producers: []
        }
      }
      const signup = {
        account: 'proxy4nation',
        name: 'signup',
        authorization: [
          {
            actor: user,
            permission: wallet.auth.permission
          }
        ],
        data: {
          owner: user,
          referral: 'eosnationinc'
        }
      }
      if (a.vote) actions.push(vote)
      if (a.signup) actions.push(signup)
      if (a.claim) actions.push(claim)
      try {
        resp = await wallet.eosApi.transact(
          {
            actions: actions
          },
          {
            broadcast: true,
            blocksBehind: 3,
            expireSeconds: 60
          }
        )
        this.checkSignup()
        const userInfo = await wallet.fetchAccountInfo(user)
        vxm.eosTransit.setUserInfo(userInfo)
      } catch (e) {
        resp = e
      }
    }
    return resp
  }
  @action async vote() {
    const wallet = vxm.eosTransit.wallet
    let resp: any
    if (wallet && wallet.auth) {
      const user = wallet.auth.accountName
      try {
        resp = await wallet.eosApi.transact(
          {
            actions: [
              {
                account: 'eosio',
                name: 'voteproducer',
                authorization: [
                  {
                    actor: user,
                    permission: wallet.auth.permission
                  }
                ],
                data: {
                  voter: user,
                  proxy: 'proxy4nation',
                  producers: []
                }
              }
            ]
          },
          {
            broadcast: true,
            blocksBehind: 3,
            expireSeconds: 60
          }
        )
        const userInfo = await wallet.fetchAccountInfo(user)
        vxm.eosTransit.setUserInfo(userInfo)
      } catch (e) {
        resp = e
      }
    }
    return resp
  }
  @action async signup() {
    const wallet = vxm.eosTransit.wallet
    let resp: any
    if (wallet && wallet.auth) {
      const user = wallet.auth.accountName
      try {
        resp = await wallet.eosApi.transact(
          {
            actions: [
              {
                account: 'proxy4nation',
                name: 'signup',
                authorization: [
                  {
                    actor: wallet.auth.accountName,
                    permission: wallet.auth.permission
                  }
                ],
                data: {
                  owner: wallet.auth.accountName,
                  referral: ''
                }
              }
            ]
          },
          {
            broadcast: true,
            blocksBehind: 3,
            expireSeconds: 60
          }
        )
        await this.checkSignup()
      } catch (e) {
        resp = e
      }
    }
    return resp
  }
  @mutation setVoters(v: VotersTable[]) {
    this.voters = v
  }

  @mutation setUserSigned(v: VotersTable | false) {
    this.userSignedUp = v
  }

  // Get / Set Language from Browser/LocaleStorage
  // or
  // Set Language from user input
  @mutation setLanguage(lang?: string) {
    if (lang) {
      this.language = i18n.locale = lang
      localStorage.setItem('language', lang)
    } else {
      let userLang: string | null = localStorage.getItem('language')
      if (userLang) {
        this.language = i18n.locale = userLang
      } else {
        let browserLang = navigator.language.split('-')[0]
        this.language = i18n.locale = browserLang
        localStorage.setItem('language', browserLang)
      }
    }
  }
}
export const core = CoreModule.ExtractVuexModule(CoreModule)
