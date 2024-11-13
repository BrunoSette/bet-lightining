export interface Bet {
  id: number
  user_id: number
  market_id: number
  bet_type: 'yes' | 'no'
  amount_sats: number
  price: number
  outcome?: 'won' | 'lost'
  created_at: Date
  prediction: string
  actual_result?: string
} 