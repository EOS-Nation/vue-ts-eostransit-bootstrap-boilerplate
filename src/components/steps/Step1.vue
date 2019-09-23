<template>
  <step-ui :step="1" title="Proxy">
    <template v-if="proxy === true">
      <p>All set, you are voting for our proxy:</p>
      <p>proxy4nation</p>
    </template>
    <template v-else>
      <p>Currently you are NOT voting for our proxy!</p>
      <p v-if="proxy">Your Proxy is: {{ proxy }}</p>
      <b-btn @click="vote()" variant="primary" :disabled="loading">
        <font-awesome-icon
          v-if="!loading"
          icon="vote-yea"
          fixed-width
          class="mr-1"
        />
        <font-awesome-icon
          v-else
          icon="spinner"
          spin
          fixed-width
          class="mr-1"
        />
        Vote for us
      </b-btn>
    </template>
  </step-ui>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import StepUi from '@/components/steps/StepUi.vue'
@Component({
  components: { StepUi }
})
export default class Step1 extends Vue {
  voteResp: any = false
  loading = false

  get proxy() {
    return vxm.core.userProxy
  }

  async vote() {
    this.loading = true
    this.voteResp = await vxm.core.vote()
    this.loading = false
  }
}
</script>

<style scoped lang="scss"></style>
