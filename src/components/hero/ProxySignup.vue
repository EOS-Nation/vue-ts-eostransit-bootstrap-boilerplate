<template>
  <div>
    <span class="text-white-50 font-w600">Action Required</span>
    <div class="d-flex justify-content-center mb-3">
      <b-badge
        v-if="(!userProxy || typeof userProxy === 'string') && activeProxy"
        variant="secondary"
        class="badge-pill p-2 m-1"
      >
        <font-awesome-icon icon="vote-yea" class="mx-1" /> Vote:
        {{ activeProxy }}
      </b-badge>
      <b-badge v-if="!activeProxy" variant="danger" class="badge-pill p-2 m-1">
        <font-awesome-icon icon="exclamation-triangle" class="mx-1" /> Signup
        currently disabled
      </b-badge>
      <b-badge
        v-if="!userSigned && activeProxy"
        variant="secondary"
        class="badge-pill p-2 m-1"
      >
        <font-awesome-icon icon="check-double" class="mx-1" /> Signup
      </b-badge>
    </div>
    <b-btn
      @click="claim()"
      variant="primary"
      :disabled="loading || !activeProxy"
    >
      <font-awesome-icon
        v-if="!loading"
        icon="check-circle"
        fixed-width
        class="mr-1"
      />
      <font-awesome-icon v-else icon="spinner" spin fixed-width class="mr-1" />
      Do it!
    </b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
@Component
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

  get activeProxy() {
    return vxm.core.activeProxy
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
