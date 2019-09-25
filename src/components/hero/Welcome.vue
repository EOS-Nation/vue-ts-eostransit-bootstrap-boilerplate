<template>
  <div>
    <rewards class="my-5" />
    <b-btn @click="login()" variant="hero-primary" :disabled="loading" class="mt-2">
      <font-awesome-icon
        v-if="!loading"
        icon="arrow-right"
        fixed-width
        class="mr-1"
      />
      <font-awesome-icon v-else icon="spinner" spin fixed-width class="mr-1" />
      Get Started
    </b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import Rewards from '@/components/layout/Rewards.vue'
@Component({
  components: { Rewards }
})
export default class Welcome extends Vue {
  voteResp: any = false
  loading = false

  get proxy() {
    return vxm.core.userProxy
  }

  login() {
    this.$bvModal.show('modal-login')
  }
}
</script>

<style scoped lang="scss"></style>
