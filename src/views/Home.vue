<template>
  <b-row>
    <b-col md="4"><step1 /></b-col>
    <b-col md="4"><step2 /></b-col>
    <b-col md="4"><step3 /></b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'
import HelloWorld from '@/components/HelloWorld.vue'
import EosTransit from '@/components/authentication/EosTransit.vue'
import Step1 from '@/components/steps/Step1.vue'
import Step2 from '@/components/steps/Step2.vue'
import Step3 from '@/components/steps/Step3.vue' // @ is an alias to /src

@Component({
  components: {
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

  get isAuthenticated() {
    if (vxm.eosTransit.walletState)
      return vxm.eosTransit.walletState.authenticated
    else return false
  }

  logout() {
    vxm.eosTransit.logout()
  }
}
</script>
