<template>
  <div>
    <h2>Step 1</h2>
    <h3>Proxy</h3>
    <p>Vote for our Proxy: {{ proxy }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'

@Component
export default class Step1 extends Vue {
  @Prop() private msg!: string

  get proxy() {
    return vxm.core.userProxy
  }

  get language() {
    return vxm.core.language
  }

  set language(lang: string) {
    vxm.core.setLanguage(lang)
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
