<template>
  <hero-ui title="Action Required">
    <template v-slot:headline>
      PROXY<span class="text-primary-light">4</span>NATION
    </template>
    <div class="d-flex justify-content-center">
      <b-badge
        v-if="!userProxy || typeof userProxy === 'string'"
        variant="secondary"
        class="badge-pill p-2 m-1"
      >
        <font-awesome-icon icon="vote-yea" class="mx-1" /> Vote: PROXY4NATION
      </b-badge>
      <b-badge
        v-if="!userSigned"
        variant="secondary"
        class="badge-pill p-2 m-1"
      >
        <font-awesome-icon icon="check-double" class="mx-1" /> Signup
      </b-badge>
    </div>
    <div v-if="claimResp">
      <pre>{{ claimResp }}</pre>
    </div>
    <template v-slot:button>
      <b-btn @click="claim()" variant="primary" :disabled="loading">
        <font-awesome-icon
          v-if="!loading"
          icon="check-double"
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
        Do it!
      </b-btn>
    </template>
  </hero-ui>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import StepUi from '@/components/steps/StepUi.vue'
import HeroUi from '@/components/hero/HeroUi.vue'
@Component({
  components: { HeroUi }
})
export default class ProxySignup extends Vue {
  loading = false
  claimResp: any = false

  get userState() {
    return vxm.core.userState
  }

  get userSigned() {
    return vxm.core.userSignedUp
  }

  get userProxy() {
    return vxm.core.userProxy
  }

  async claim() {
    this.loading = true
    this.claimResp = await vxm.core.claim({
      vote: !this.userProxy || typeof this.userProxy === 'string',
      signup: !this.userSigned,
      claim: false
    })
    this.loading = false
  }
}
</script>

<style scoped lang="scss"></style>
