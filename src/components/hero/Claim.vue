<template>
  <div class="mt-4">
    <span class="claimTimer display-4 font-w700 text-white mb-3">
      <vue-countdown
        v-if="seconds > 0"
        @time-expire="handleTimeExpire"
        :seconds="seconds"
        :message="'NOW'"
        :start="true"
      >
      </vue-countdown>
      <font-awesome-icon
        v-else-if="seconds === 0 || loading"
        icon="spinner"
        spin
      />
      <span v-else>CLAIM NOW</span>
    </span>
    <h3 class="font-w300 text-white-75 mb-2">
      Next Claim Period
    </h3>
    <b-progress
      v-if="seconds > 0"
      :max="interval"
      :value="interval - seconds"
      animated
      class="my-3"
    />
    <b-progress v-else :max="100" :value="100" class="my-3" />
    <rewards />
    <b-btn
      :disabled="seconds >= 0 || loading"
      @click="claim()"
      variant="hero-primary"
      class="mt-4"
    >
      <font-awesome-icon
        v-if="!loading"
        icon="coins"
        fixed-width
        class="mr-1"
      />
      <font-awesome-icon v-else icon="spinner" spin fixed-width class="mr-1" />
      CLAIM
    </b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/'
// @ts-ignore
import VueCountdown from '@dmaksimovic/vue-countdown'
import ProxyNation from '@/components/layout/ProxyNation.vue'
import Rewards from '@/components/layout/Rewards.vue'
@Component({
  components: { Rewards, ProxyNation, VueCountdown }
})
export default class Claim extends Vue {
  loading = false
  claimResp: any = false
  seconds = 0
  polling: any
  progressTime: any

  get userState() {
    return vxm.core.userState
  }

  get interval() {
    const interval = vxm.core.settings
    if (interval && interval.interval) {
      return interval.interval
    } else return 0
  }

  get userSigned() {
    return vxm.core.userSignedUp
  }

  get userProxy() {
    return vxm.core.userProxy
  }

  async claim() {
    this.loading = true
    this.claimResp = await vxm.core.claim({
      vote: false,
      signup: false,
      claim: true
    })
    const test = await vxm.core.calcRewards()
    console.log(test)
    this.calcSeconds()
    this.pollData()
    this.progressData()
    this.loading = false
  }
  handleTimeExpire() {
    clearInterval(this.progressTime)
    this.seconds = -1
  }

  pollData() {
    this.polling = setInterval(() => {
      this.calcSeconds()
    }, 1000)
  }
  progressData() {
    this.progressTime = setInterval(() => {
      this.calcSeconds()
    }, 10000)
  }

  calcSeconds() {
    if (this.userSigned) {
      let now: any = new Date().getTime()
      let offset = new Date(
        this.userSigned.next_claim_period
      ).getTimezoneOffset()
      let end = new Date(this.userSigned.next_claim_period).getTime()
      let ms = end - now
      this.seconds = parseInt((ms / 1000 - offset * 60).toString())
      clearInterval(this.polling)
    }
  }
  beforeDestroy() {
    clearInterval(this.polling)
    clearInterval(this.progressTime)
  }

  created() {
    this.pollData()
    this.progressData()
  }
}
</script>

<style scoped lang="scss">
.claimTimer {
  letter-spacing: 10px;
}
</style>
