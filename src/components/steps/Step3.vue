<template>
  <step-ui :step="3" title="Claim">
    <b-btn @click="claim()" variant="primary">CLAIM</b-btn>
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
  get userSigned() {
    return vxm.core.userSigned
  }

  claim() {
    vxm.core.claim()
  }
}
</script>

<style scoped lang="scss"></style>
