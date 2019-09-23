<template>
  <step-ui :step="3" title="Claim">
    <p>Claim your Tokens every 24h!</p>
    <b-btn @click="claim()" variant="primary" :disabled="loading">
      <font-awesome-icon
        v-if="!loading"
        icon="coins"
        fixed-width
        class="mr-1"
      />
      <font-awesome-icon v-else icon="spinner" spin fixed-width class="mr-1" />
      Claim
    </b-btn>
  </step-ui>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import StepUi from '@/components/steps/StepUi.vue'
@Component({
  components: { StepUi }
})
export default class Step3 extends Vue {
  loading = false
  claimResp: any = false

  get userSigned() {
    return vxm.core.userSigned
  }

  async claim() {
    this.loading = true
    this.claimResp = await vxm.core.claim()
    this.loading = false
  }
}
</script>

<style scoped lang="scss"></style>
