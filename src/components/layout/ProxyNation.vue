<template>
  <div>
    <h1 class="display-4 font-w700 text-white mb-3">
      PROXY<span class="text-primary-light">4</span>NATION
    </h1>
    <h2 v-if="apr && period" class="font-w300 text-white-75 mb-2">
      Vote for our proxy and claim your share {{ apr }}% APR every
      {{ period }} hours!
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
  apr: number | false = false
  period: number | false = false

  async created() {
    const settings = await vxm.eosTransit.accessContext.eosRpc.get_table_rows({
      code: 'proxy4nation',
      table: 'settings',
      scope: 'proxy4nation',
      limit: 1
    })
    this.apr = settings.rows[0].rate / 100
    this.period = settings.rows[0].interval / 60 / 60
  }
}
</script>

<style scoped lang="scss"></style>
