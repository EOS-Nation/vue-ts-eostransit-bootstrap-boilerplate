<template>
  <div>
    <h2>Step 3</h2>
    <h3>Claim</h3>
    <b-btn @click="claim()" variant="primary">CLAIM</b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component
export default class Step3 extends Vue {
  @Prop() private msg!: string

  get userSigned() {
    return vxm.core.userSigned
  }

  get language() {
    return vxm.core.language
  }

  set language(lang: string) {
    vxm.core.setLanguage(lang)
  }

  claim() {
    vxm.core.claim()
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
