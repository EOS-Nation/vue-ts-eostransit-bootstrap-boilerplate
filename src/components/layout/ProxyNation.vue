<template>
  <div>
    <h1 class="display-4 font-w700 text-white mb-3">
      PROXY<span class="text-primary-light">4</span>NATION
    </h1>
    <h2 v-if="rate && interval" class="font-w300 text-white-75 mb-2">
      Vote for our proxy and claim your share {{ rate }}% APR every
      {{ interval }}!
    </h2>
    <h2 v-else class="font-w300 text-white-75 mb-2">
      Vote for our proxy and claim your share
      <font-awesome-icon icon="spinner" spin /> % APR every
      <font-awesome-icon icon="spinner" spin /> hours!
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component
export default class ProxyNation extends Vue {
  get rate() {
    const rate = vxm.core.settings
    if (rate && rate.rate) return rate.rate / 100
    else return false
  }
  get interval() {
    const interval = vxm.core.settings
    if (interval && interval.interval) {
      let hours = interval.interval / 60 / 60
      if (hours >= 1) return hours + ' hours'
      else return hours * 60 + ' minutes'
    } else return false
  }
}
</script>

<style scoped lang="scss"></style>
