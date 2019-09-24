<template>
  <div v-if="true" class="content content-full text-center">
    <h1 class="display-4 font-w700 text-white mb-3">
      <slot name="headline"></slot>
    </h1>
    <h2 v-if="title" class="font-w300 text-white-75 mb-2">
      {{ title }}
    </h2>
    <slot></slot>
    <div class="mt-3">
      <slot name="button"></slot>
    </div>
  </div>
  <div v-else class="block block-rounded">
    <div class="block-header">
      <h3 class="block-title">
        Step {{ step }} <small>{{ title }}</small>
      </h3>
    </div>
    <div class="block-content text-center pb-3">
      <slot></slot>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component
export default class HeroUi extends Vue {
  @Prop() private title?: string

  get userProxy() {
    return vxm.core.userProxy
  }

  get userSignedUp() {
    return vxm.core.userSignedUp
  }

  get isAuthenticated() {
    return vxm.eosTransit.isAuthenticated
  }
}
</script>

<style scoped lang="scss"></style>
