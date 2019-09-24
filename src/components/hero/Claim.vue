<template>
  <hero-ui>
    <template v-slot:headline>
      <h2 class="font-w300 text-white-75 mb-2">
        Claim again in
      </h2>
      <h1 class="display-4 font-w700 text-white mb-3">
        <vue-countdown
          v-if="seconds"
          @time-expire="handleTimeExpire"
          :seconds="seconds"
          :message="'CLAIM NOW'"
          :start="true"
          class="text-white"
        >
        </vue-countdown>
      </h1>
    </template>
    <b-progress :max="24*60*60" :value="24*60*60 - seconds" animated/>
    <template v-if="seconds < 1" v-slot:button>
      <b-btn @click="claim()" variant="primary" :disabled="loading">
        <font-awesome-icon
          v-if="!loading"
          icon="coins"
          fixed-width
          class="mr-1"
        />
        <font-awesome-icon
          v-else
          icon="spinner"
          spin
          fixed-width
          class="mr-1"
        />
        CLAIM
      </b-btn>
    </template>
  </hero-ui>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/'
import HeroUi from '@/components/hero/HeroUi.vue'
// @ts-ignore
import VueCountdown from '@dmaksimovic/vue-countdown'
@Component({
  components: { HeroUi, VueCountdown }
})
export default class Claim extends Vue {
  loading = false
  claimResp: any = false
  seconds = 0
  polling: any

  get userState() {
    return vxm.core.userState
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
    this.loading = false
  }
  handleTimeExpire() {
    this.seconds = 0
  }

  pollData() {
    this.polling = setInterval(() => {
      this.calcSeconds()
    }, 1000)
  }

  calcSeconds() {
    if (this.userSigned) {
      let now: any = new Date().getTime()
      let offset = new Date(
        this.userSigned.next_claim_period
      ).getTimezoneOffset()
      console.log(offset)
      let end = new Date(this.userSigned.next_claim_period).getTime()
      let ms = end - now
      this.seconds = parseInt((ms / 1000 - offset * 60).toString())
      clearInterval(this.polling)
    }
  }
  beforeDestroy() {
    clearInterval(this.polling)
  }

  created() {
    this.pollData()
  }
}
</script>

<style scoped lang="scss">
  h1 {
    letter-spacing: 10px;
  }
</style>
