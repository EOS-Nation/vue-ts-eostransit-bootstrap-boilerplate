<template>
  <b-modal id="modal-success" size="lg" centered hide-footer>
    <template slot="modal-title">
      PROXY4NATION - Claim
    </template>
    <transition name="slide-fade" mode="out-in">
      <b-row key="success">
        <b-col cols="12" class="text-center">
          <font-awesome-icon
            icon="check-circle"
            class="fa-4x text-success mt-4"
          />
          <h2 class="my-4">You have successfully claimed:</h2>
          <div class="d-flex justify-content-center my-5 py-2">
            <div class="d-flex justify-content-center align-items-center mx-2">
              <img
                src="@/assets/img/eos-logo.png"
                alt="Token Logo"
                class="img-avatar img-avatar48 mx-2"
              />
              <div>
                <h4 v-if="rewards" class="m-0 p-0">{{ rewards.eos }}</h4>
                <h4 v-else class="m-0 p-0">0.0000</h4>
                <h3 class="m-0 p-0">EOS</h3>
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center mx-2">
              <img
                src="@/assets/img/dapp-logo.jpeg"
                alt="Token Logo"
                class="img-avatar img-avatar48 mx-2"
              />
              <div>
                <h4 v-if="rewards" class="m-0 p-0">{{ rewards.dapp }}</h4>
                <h4 v-else class="m-0 p-0">0.0000</h4>
                <h3 class="m-0 p-0">
                  DAPP
                </h3>
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center mx-2">
              <img
                src="@/assets/img/usdt-logo.png"
                alt="Token Logo"
                class="img-avatar img-avatar48 mx-2"
              />
              <div>
                <h4 v-if="rewards" class="m-0 p-0">{{ rewards.usdt }}</h4>
                <h4 v-else class="m-0 p-0">0.0000</h4>
                <h3 class="m-0 p-0">
                  USDT
                </h3>
              </div>
            </div>
          </div>
          <h3 class="my-4">Thank you for supporting EOS Nation!</h3>
        </b-col>
      </b-row>
    </transition>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import { WalletProvider } from 'eos-transit'

@Component
export default class ModalSuccess extends Vue {
  // Props
  @Prop() rewards!: any
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
