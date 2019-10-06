<template>
  <div>
    <h1 class="display-4 font-w700 text-white mb-3">
      PROXY<span class="text-primary-light">4</span>NATION
    </h1>
    <h2 v-if="rate && interval && rex" class="font-w300 text-white-75 mb-2">
      Proxy to EOS Nation and claim your share every {{ interval }}!
      <br />
      <span @click="toggleTooltip" id="tooltip-apr">
        <font-awesome-icon icon="info-circle" class="font-size-base mb-1" />
        APR {{ numeral(rate + 0.17 + 0.11 + 0.71).format('0.00') }}%
      </span>
      <b-tooltip
        :show.sync="tooltip"
        target="tooltip-apr"
        triggers="hover focus"
      >
        <div class="py-2">
          APR is calculated at the time of claim and is subject to change based
          on the amount of EOS proxied
          <hr class="text-muted my-2" />
          <strong>Current APR:</strong>
          {{ numeral(rate + 0.17 + 0.71 + 0.11).format('0.00') }}%
          <br />
          <!-- USDT APR = 1 / USD * APR * Multiplier (ex: 1 / 3.01 * 2.10 * 1 = 0.697% )-->
          <!-- DAPP APR = DAPP/EOS * APR * Multiplier (ex: 0.006362 * 2.10 * 10 = 0.133% )-->
          <strong>EOS:</strong> {{ numeral(rate).format('0.00') }}%<br />
          <strong>REX:</strong> {{ numeral(0.17).format('0.00') }}%<br />
          <strong>USDT:</strong> {{ numeral(0.71).format('0.00') }}%<br />
          <strong>DAPP:</strong> {{ numeral(0.11).format('0.00') }}%<br />
          <strong>CPU:</strong> Bonus<br />
        </div>
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
import numeral from 'numeral'

@Component
export default class ProxyNation extends Vue {
  numeral = numeral
  tooltip = false
  get rate() {
    const rate = vxm.core.settings
    if (rate && rate.bp) return rate.bp / 100
    else return false
  }
  get rex() {
    const rate = vxm.core.settings
    if (rate && rate.rex) return rate.rex / 100
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

  toggleTooltip() {
    this.tooltip = !this.tooltip
  }
}
</script>

<style scoped lang="scss"></style>
