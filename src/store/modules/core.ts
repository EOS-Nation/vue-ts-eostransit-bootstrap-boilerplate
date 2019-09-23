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

  get userSigned() {
    const isAuthenticated = vxm.eosTransit.isAuthenticated
    if (!isAuthenticated) return false
    else {
      const user = this.voters.find((u: VotersTable) => {
        return u.owner === isAuthenticated
      })
      if (user) return user
      else return false
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

  @action async claim() {
    const wallet = vxm.eosTransit.wallet
    if (wallet && wallet.auth)
      wallet.eosApi
        .transact(
          {
            actions: [
              {
                account: 'proxy4nation',
                name: 'claim',
                authorization: [
                  {
                    actor: wallet.auth.accountName,
                    permission: wallet.auth.permission
                  }
                ],
                data: {
                  owner: wallet.auth.accountName
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
        .then((resp: any) => {})
        .catch((error: any) => {})
  }
  @action async signup() {
    const wallet = vxm.eosTransit.wallet
    if (wallet && wallet.auth)
      wallet.eosApi
        .transact(
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
        .then((resp: any) => {})
        .catch((error: any) => {})
  }
  @mutation setVoters(v: VotersTable[]) {
    this.voters = v
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
