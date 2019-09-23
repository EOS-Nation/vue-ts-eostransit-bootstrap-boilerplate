<template>
  <div>
    <b-table
      striped
      hover
      :fields="fields"
      :items="voters"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <!-- A virtual column -->
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store'

@Component
export default class Voters extends Vue {
  fields = [
    { key: 'index', label: '#', sortable: false },
    { key: 'owner', sortable: true },
    { key: 'proxy', sortable: false },
    { key: 'producers', sortable: false },
    { key: 'staked', sortable: true },
    { key: 'last_vote_weight', sortable: true },
    { key: 'is_proxy', sortable: true },
    { key: 'next_claim_period', sortable: true }
  ]
  sortBy = 'owner'
  sortDesc = false
  get voters() {
    return vxm.core.voters
  }
  created() {
    vxm.core.getVoters()
  }
}
</script>
