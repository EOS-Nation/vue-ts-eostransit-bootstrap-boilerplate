<template>
  <b-container>
    <navigation />
    <b-row>
      <b-col>
        <router-view />
      </b-col>
    </b-row>
    <modal-login />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navigation from '@/components/layout/Navigation.vue'
import ModalLogin from '@/components/authentication/ModalLogin.vue'
import { vxm } from '@/store/'
import { WalletProvider } from 'eos-transit/lib'

@Component({
  components: {
    Navigation,
    ModalLogin
  }
})
export default class App extends Vue {
  created() {
    const autoLogin = localStorage.getItem('autoLogin')
    if (autoLogin) {
      const provider = vxm.eosTransit.walletProviders.find(
        (p: WalletProvider) => p.id === autoLogin
      )
      if (provider) vxm.eosTransit.initLogin(provider)
    }
    vxm.core.setLanguage()
  }
}
</script>
