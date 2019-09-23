export interface VotersTable {
  owner: string
  proxy: string
  producers: string[]
  staked: number
  last_vote_weight: string
  is_proxy: boolean
  next_claim_period: Date
}
