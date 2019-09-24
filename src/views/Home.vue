<template>
  <div
    class="bg-image"
    :style="
      'background-image: url(' + require('@/assets/img/photo4@2x.jpg') + ');'
    "
  >
    <div class="hero bg-dark-90">
      <div class="hero-inner">
        <welcome v-if="userState === 'auth'" />
        <proxy-signup v-if="userState === 'proxy' || userState === 'signup'" />
        <claim v-if="userState === 'claim'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'
import HelloWorld from '@/components/HelloWorld.vue'
import EosTransit from '@/components/authentication/EosTransit.vue'
import Step1 from '@/components/steps/Step1.vue'
import Step2 from '@/components/steps/Step2.vue'
import Step3 from '@/components/steps/Step3.vue'
import Welcome from '@/components/hero/Welcome.vue'
import ProxySignup from '@/components/hero/ProxySignup.vue'
import Claim from '@/components/hero/Claim.vue' // @ is an alias to /src

@Component({
  components: {
    Claim,
    ProxySignup,
    Welcome,
    Step3,
    Step2,
    Step1,
    HelloWorld,
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
