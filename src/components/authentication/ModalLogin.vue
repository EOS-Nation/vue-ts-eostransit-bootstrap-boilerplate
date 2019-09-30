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
        <b-col v-if="selectedProvider.id !== 'ledger'" class="text-center">
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
            Searching for accounts on your Ledger device...
          </div>
          <div v-else>
            <h4>
              <span class="text-capitalize">Choose Account</span>
            </h4>
            <template v-for="key in ledgerDiscovery">
              <b-btn
                variant="primary"
                v-for="account in key.accounts"
                :key="account.account"
                class="btn-block mr-1"
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
import { WalletProvider } from 'eos-transit'

@Component
export default class ModalLogin extends Vue {
  // data
  loading = false
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

  providerLogoUrl(p: WalletProvider) {
    switch (p.id) {
      case 'scatter':
        return 'scatter.svg'
      case 'ledger':
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
      this.$bvModal.hide('modal-login')
    } catch (e) {
      this.error = e
      console.log(e)
    } finally {
      this.loading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row {
  min-height: 50vh;
}

.img-avatar-thumb {
  margin: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  -webkit-box-shadow: 0 0 0 0.25rem hsla(0, 0%, 100%, 0.3);
  box-shadow: 0 0 0 0.25rem hsla(0, 0%, 100%, 0.3);
}
.img-avatar {
  display: inline-block !important;
  width: 64px;
  height: 64px;
  border-radius: 50%;
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
