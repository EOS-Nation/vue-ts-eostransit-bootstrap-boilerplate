<template>
  <b-modal id="modal-login" size="lg" centered hide-footer>
    <template slot="modal-title">
      Select Wallet Provider
    </template>
    <transition name="slide-fade" mode="out-in">
      <b-row
        v-if="!loading && !error"
        key="select"
        class="d-flex align-items-center justify-content-center"
      >
        <b-col
          md="6"
          lg="4"
          v-for="provider in walletProviders"
          :key="provider.id"
          class="text-center"
        >
          <img
            @click="initLogin(provider)"
            class="img-avatar img-avatar-thumb cursor mt-3 mb-2"
            :src="require('@/assets/img/' + providerLogoUrl(provider))"
            alt="Provider Logo"
          />
          <h3 @click="initLogin(provider)" class="cursor mb-4">
            {{ provider.meta.name }}
          </h3>
        </b-col>
      </b-row>
      <b-row v-else-if="error" key="error" class="d-flex align-items-center">
        <b-col class="text-center">
          <img
            class="img-avatar img-avatar-thumb cursor mb-2"
            :src="require('@/assets/img/' + providerLogoUrl(selectedProvider))"
            alt="Provider Logo"
          />
          <h3 class="mt-2">{{ selectedProvider.meta.name }}</h3>
          <p v-if="error.message">{{ error.message }}</p>
          <p v-else>{{ error }}</p>
          <b-btn @click="error = false">Try Again</b-btn>
        </b-col>
      </b-row>
      <b-row v-else key="loading" class="d-flex align-items-center">
        <b-col
          v-if="selectedProvider.id !== 'ledgeruwebauthn'"
          class="text-center"
        >
          <img
            class="img-avatar img-avatar-thumb cursor mb-2"
            :src="require('@/assets/img/' + providerLogoUrl(selectedProvider))"
            alt="Provider Logo"
          />
          <h3 class="mt-2">{{ selectedProvider.meta.name }}</h3>
          {{ loginStatus[0] }}
        </b-col>
        <b-col v-else class="text-center">
          <img
            class="img-avatar img-avatar-thumb cursor mb-2"
            :src="require('@/assets/img/' + providerLogoUrl(selectedProvider))"
            alt="Provider Logo"
          />
          <h3 class="mt-2">{{ selectedProvider.meta.name }}</h3>
          <div v-if="!ledgerDiscovery">
            <p>
              Searching for accounts on your Ledger device...<br />Please make
              sure your Ledger is unlocked and opened the EOS App.
            </p>
            <font-awesome-icon
              icon="spinner"
              spin
              class="fa-3x my-3 text-primary"
            />
          </div>
          <div v-else>
            <h4 class="text-capitalize my-4">
              Choose Account
            </h4>
            <template v-for="key in ledgerDiscovery.keyToAccountMap">
              <b-btn
                variant="primary"
                v-for="account in key.accounts"
                :key="account.account"
                @click="ledgerLogin(account)"
                class="btn-block mr-1"
                :disabled="loadingLedger"
              >
                <span class="font-w700">{{ account.account }}</span
                >@{{ account.authorization }}
              </b-btn>
            </template>
          </div>
        </b-col>
      </b-row>
    </transition>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/'
import { DiscoveryAccount, WalletProvider } from 'eos-transit'

@Component
export default class ModalLogin extends Vue {
  // data
  loading = false
  loadingLedger = false
  error: any = false
  // computed
  get walletProviders(): WalletProvider[] {
    return vxm.eosTransit.walletProviders
  }

  get selectedProvider() {
    return vxm.eosTransit.selectedProvider
  }

  get ledgerDiscovery() {
    return vxm.eosTransit.discoveryData
  }

  get loginStatus() {
    return vxm.eosTransit.loginStatus
  }

  get loginError() {
    return vxm.eosTransit.loginError
  }

  get wallet() {
    return vxm.eosTransit.wallet
  }

  async ledgerLogin(u: any) {
    try {
      this.loadingLedger = true
      await vxm.eosTransit.ledgerLogin(u)
      this.$bvModal.hide('modal-login')
    } catch (e) {
      this.error = e
      console.log(e)
    }
    this.loadingLedger = false
    this.loading = false
  }

  providerLogoUrl(p: WalletProvider) {
    switch (p.id) {
      case 'scatter':
        return 'scatter.svg'
      case 'ledgeruwebauthn':
        return 'ledger.png'
      case 'meetone_provider':
        return 'meetone.jpg'
      case 'Keycat':
        return 'keycat.svg'
      case 'TokenPocket':
        return 'tp.jpg'
      case 'EOS Lynx':
        return 'lynx.jpg'
      case 'whalevault':
        return 'whalevault.png'
      default:
        return 'eos.png'
    }
  }

  // methods
  async initLogin(p: WalletProvider) {
    this.loading = true
    try {
      await vxm.eosTransit.initLogin(p)
      if (p.id !== 'ledgeruwebauthn') {
        this.$bvModal.hide('modal-login')
        this.loading = false
      }
    } catch (e) {
      this.error = e
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row {
  min-height: 50vh;
}
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
