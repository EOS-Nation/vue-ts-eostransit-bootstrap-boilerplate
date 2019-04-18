import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import i18n from '@/i18n'

@Module({ namespacedPath: 'core/' })
export class CoreModule extends VuexModule {
  @getter language: string = 'en'

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
