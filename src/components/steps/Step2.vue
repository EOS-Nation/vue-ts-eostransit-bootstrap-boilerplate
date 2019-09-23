<template>
  <step-ui :step="2" title="Signup">
    <template v-if="userSigned">
      <font-awesome-icon
        icon="check-double"
        fixed-width
        class="fa-3x text-success mb-3"
      />
      <p>Cool, you are signed up and ready to claim!</p>
    </template>
    <template v-else>
      <p>Please signup first before you can claim your rewards.</p>
      <b-btn @click="signup()" variant="primary" :disabled="loading">
        <font-awesome-icon
          v-if="!loading"
          icon="user-plus"
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
        Signup Now
      </b-btn>
    </template>
  </step-ui>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import { VotersTable } from '@/types/proxy'
import StepUi from '@/components/steps/StepUi.vue'
@Component({
  components: { StepUi }
})
export default class Step2 extends Vue {
  loading = false
  signupResp: any = false

  get isAuthenticated(): string | false {
    return vxm.eosTransit.isAuthenticated
  }

  get userSigned() {
    return vxm.core.userSignedUp
  }

  async signup() {
    this.loading = true
    this.signupResp = await vxm.core.signup()
    this.loading = false
  }
}
</script>

<style scoped lang="scss"></style>
