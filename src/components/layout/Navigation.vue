<template>
  <header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div>
        <span class="text-white font-w700 mr-2">
          <font-awesome-icon icon="heart" fixed-width />
          EOS Nation Proxy Portal
        </span>
        <b-btn variant="primary" :to="{ name: 'home' }" class="mr-2" exact>
          <font-awesome-icon icon="coins" fixed-width />
          Claim
        </b-btn>
        <b-btn variant="primary" :to="{ name: 'voters' }" exact>
          <font-awesome-icon icon="vote-yea" fixed-width />
          Voters
        </b-btn>
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div>
        <b-btn @click="loginAction()" variant="primary">
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
