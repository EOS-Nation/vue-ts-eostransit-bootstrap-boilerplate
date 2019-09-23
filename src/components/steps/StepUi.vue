<template>
  <div class="block block-rounded">
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
export default class StepUi extends Vue {
  @Prop() private step!: number
  @Prop() private title!: string
}
</script>

<style scoped lang="scss"></style>
