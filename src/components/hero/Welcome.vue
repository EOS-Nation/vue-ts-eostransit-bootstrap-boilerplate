<template>
  <hero-ui
    title="Vote for our proxy and claim your share 4% APR every 24 hours!"
  >
    <template v-slot:headline>
      <h1 class="display-4 font-w700 text-white mb-3">
        PROXY<span class="text-primary-light">4</span>NATION
      </h1>
    </template>
    <template v-slot:button>
      <b-btn @click="login()" variant="primary" :disabled="loading">
        <font-awesome-icon
          v-if="!loading"
          icon="arrow-right"
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
        Get Started
      </b-btn>
    </template>
  </hero-ui>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import HeroUi from '@/components/hero/HeroUi.vue'
@Component({
  components: { HeroUi }
})
export default class Welcome extends Vue {
  voteResp: any = false
  loading = false

  get proxy() {
    return vxm.core.userProxy
  }

  login() {
    this.$bvModal.show('modal-login')
  }
}
</script>

<style scoped lang="scss"></style>
