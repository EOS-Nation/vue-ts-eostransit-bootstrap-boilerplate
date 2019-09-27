<template>
  <div>
    <h1 class="display-4 font-w700 text-white mb-3">
      PROXY<span class="text-primary-light">4</span>NATION
    </h1>
    <h2 v-if="rate && interval" class="font-w300 text-white-75 mb-2">
      Proxy to EOS Nation and claim your share every {{ interval }}!
      <br />
      <span id="tooltip-apr">
        <font-awesome-icon icon="info-circle" class="font-size-base mb-1" />
        APR {{ rate + 0.16 }}%
      </span>
      <b-tooltip target="tooltip-apr" triggers="hover">
        APR is calculated at the time of claim and is subject to change based on
        the amount of EOS proxied.
        <hr class="text-muted my-2" />
        <strong>Current APR:</strong> {{ rate + 0.16 }}%
        <br />
        <strong>BP:</strong> {{ rate }}% - <strong>REX:</strong> 0.16%
      </b-tooltip>
    </h2>
    <h2 v-else class="font-w300 text-white-75 mb-2">
      Proxy to EOS Nation and claim your share every
      <font-awesome-icon icon="spinner" spin /> hours!
      <br />
      <span>
        <font-awesome-icon icon="info-circle" class="font-size-base mb-1" />
        APR <font-awesome-icon icon="spinner" spin />%
      </span>
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
