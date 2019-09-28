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
import numeral from 'numeral'

@Module({ namespacedPath: 'core/' })
export class CoreModule extends VuexModule {
  @getter language: string = 'en'
  @getter voters: VotersTable[] = []
  @getter userSignedUp: VotersTable | false = false
  @getter settings:
    | { bp: number; interval: number; rex: number; total: number }
    | false = false
  @getter rewards: any[] = []

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
      const user: any = vxm.eosTransit.userInfo
      if (user && user.voter_info) {
        if (user.voter_info.proxy === 'proxy4nation') return true
        else if (user.voter_info.proxy) return user.voter_info.proxy
        else return false
      } else return false
    }
  }

  @action async getSettings() {
    const settings = await vxm.eosTransit.accessContext.eosRpc.get_table_rows({
      code: 'proxy4nation',
      table: 'settings',
      scope: 'proxy4nation',
      limit: 1
    })
    const rewards = await vxm.eosTransit.accessContext.eosRpc.get_table_rows({
      code: 'proxy4nation',
      table: 'rewards',
      scope: 'proxy4nation',
      limit: 10
    })
    this.setRewards(rewards.rows)
    this.setSettings({
      interval: settings.rows[0].interval,
      bp: settings.rows[0].rate,
      rex: settings.rows[0].rex,
      total: settings.rows[0].rex + settings.rows[0].rate
    })
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
    if (resp && resp.rows.length) {
      this.setUserSigned(resp.rows[0])
    }
  }

  @action async calcRewards() {
    let amount = 0
    if (this.userSignedUp && this.settings)
      amount =
        (((this.userSignedUp.staked * this.settings.bp) / 10000 / 365) * 1) /
        (86400 / this.settings.interval)
    let eos = amount / 10000
    let dapp = eos * this.rewards[1].multiplier
    if (eos < 0.0001) eos = 0.0001
    if (dapp < 0.0001) dapp = 0.0001
    return {
      eos: numeral(eos).format('0,0.0000'),
      dapp: numeral(dapp).format('0,0.0000')
    }
  }

  @action async claim(a: { vote: boolean; signup: boolean; claim: boolean }) {
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
        await this.checkSignup()
        let userInfo = await wallet.fetchAccountInfo(user)
        vxm.eosTransit.setUserInfo(userInfo)
        await this.checkSignup()
        userInfo = await wallet.fetchAccountInfo(user)
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

  @mutation setRewards(r: any[]) {
    this.rewards = r
  }

  @mutation setSettings(s: {
    bp: number
    interval: number
    rex: number
    total: number
  }) {
    this.settings = s
    console.log(s)
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
