<template>
  <div class="d-flex justify-content-center align-items-center">
    <h3 class="d-none d-md-flex font-w300 text-white-75 m-0 p-0">
      Rewards:
    </h3>
    <div class="d-flex justify-content-center align-items-center mx-2">
      <img
        src="@/assets/img/eos-logo.png"
        alt="Token Logo"
        class="img-avatar img-avatar48 mx-2"
      />
      <h3 class="text-white m-0 p-0">EOS</h3>
    </div>
    <div class="d-flex justify-content-center align-items-center mx-2">
      <img
        src="@/assets/img/dapp-logo.jpeg"
        alt="Token Logo"
        class="img-avatar img-avatar48 mx-2"
      />
      <h3 class="text-white m-0 p-0">
        DAPP <span class="text-white-50 font-size-sm">(10x)</span>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component
export default class Rewards extends Vue {
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
