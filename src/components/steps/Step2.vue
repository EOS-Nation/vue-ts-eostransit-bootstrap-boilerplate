<template>
  <div>
    <h2>Step 2</h2>
    <h3>Signup</h3>
    <p v-if="userSigned">done</p>
    <b-btn v-else @click="signup()" variant="primary">Signup Now</b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import { VotersTable } from '@/types/proxy'

@Component
export default class Step2 extends Vue {
  @Prop() private msg!: string

  get voters() {
    return vxm.core.voters
  }

  get isAuthenticated(): string | false {
    return vxm.eosTransit.isAuthenticated
  }

  get userSigned() {
    return vxm.core.userSigned
  }

  get language() {
    return vxm.core.language
  }

  set language(lang: string) {
    vxm.core.setLanguage(lang)
  }

  signup() {
    vxm.core.signup()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 10px;
}
</style>
