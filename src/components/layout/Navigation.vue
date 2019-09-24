<template>
  <header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div>
        <a href="https://eosnation.io">
          <img
            src="@/assets/img/eosn.png"
            alt="EOS Nation Logo"
            height="40px"
          />
        </a>
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div>
        <b-btn @click="loginAction()" variant="dark">
          <eos-transit />
        </b-btn>
      </div>
      <!-- END Right Section -->
    </div>
    <!-- END Header Content -->
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import EosTransit from '@/components/authentication/EosTransit.vue'

@Component({
  components: {
    EosTransit
  }
})
export default class Navigation extends Vue {
  // computed
  get language() {
    return vxm.core.language
  }

  set language(lang: string) {
    vxm.core.setLanguage(lang)
  }

  get loginStatus() {
    return vxm.eosTransit.loginStatus
  }

  // methods
  async loginAction() {
    if (this.loginStatus[0] === 'Login') {
      this.$bvModal.show('modal-login')
      // vxm.eosTransit.initLogin(vxm.eosTransit.walletProviders[0])
    } else if (
      this.loginStatus[0] !== 'Authenticating' &&
      this.loginStatus[0] !== 'Connecting' &&
      this.loginStatus[0] !== 'Fetching'
    ) {
      vxm.eosTransit.logout()
    }
  }
}
</script>

<style scoped></style>
