<template>
  <b-container>
    <navigation />
    <b-row>
      <b-col>
        <router-view />
      </b-col>
    </b-row>
    <modal-login />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navigation from '@/components/layout/Navigation.vue'
import ModalLogin from '@/components/authentication/ModalLogin.vue'
import { vxm } from '@/store/'

@Component({
  components: {
    Navigation,
    ModalLogin
  }
})
export default class App extends Vue {
  created() {
    vxm.core.setLanguage()
    vxm.core.getVoters()
  }
}
</script>
