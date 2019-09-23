<template>
  <div>
    <h2>Step {{ step }}</h2>
    <h3>{{ title }}</h3>
    <slot></slot>
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
