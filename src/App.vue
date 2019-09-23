<template>
  <div
    id="page-container"
    class="page-header-fixed page-header-dark main-content-narrow"
  >
    <navigation />
    <!-- Main Container -->
    <main id="main-container">
      <!-- Page Content -->
      <div class="content">
        <router-view />
      </div>
      <!-- END Main Content -->
    </main>
    <!-- END Page Content -->
    <modal-login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navigation from '@/components/layout/Navigation.vue'
import ModalLogin from '@/components/authentication/ModalLogin.vue'
import { vxm } from '@/store/'
import { WalletProvider } from 'eos-transit'

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
