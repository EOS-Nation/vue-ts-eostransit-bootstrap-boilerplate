<template>
  <div
    class="bg-image"
    :style="
      'background-image: url(' + require('@/assets/img/photo4@2x.jpg') + ');'
    "
  >
    <div class="hero bg-dark-90">
      <div class="hero-inner">
        <div class="content content-full text-center">
          <proxy-nation />
          <welcome v-if="userState === 'auth'" />
          <proxy-signup
            v-if="userState === 'proxy' || userState === 'signup'"
          />
          <claim v-if="userState === 'claim'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'
import EosTransit from '@/components/authentication/EosTransit.vue'
import Welcome from '@/components/hero/Welcome.vue'
import ProxySignup from '@/components/hero/ProxySignup.vue'
import Claim from '@/components/hero/Claim.vue'
import ProxyNation from '@/components/layout/ProxyNation.vue' // @ is an alias to /src

@Component({
  components: {
    ProxyNation,
    Claim,
    ProxySignup,
    Welcome,
    EosTransit
  }
})
export default class Home extends Vue {
  get wallet() {
    return vxm.eosTransit.wallet
  }

  get userState() {
    return vxm.core.userState
  }

  get userProxy() {
    return vxm.core.userProxy
  }

  get userSignedUp() {
    return vxm.core.userSignedUp
  }

  get isAuthenticated() {
    return vxm.eosTransit.isAuthenticated
  }

  logout() {
    vxm.eosTransit.logout()
  }
}
</script>
<style scoped lang="scss"></style>
