import { Bet } from '@/lib/types'
import { formatDate, formatCurrency } from '@/lib/utils'

interface BetCardProps {
  bet: Bet
}

export default function BetCard({ bet }: BetCardProps) {
  const outcomeColor = bet.outcome === 'won' ? 'text-green-500' : 'text-red-500'
  
  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">Market #{bet.market_id}</h3>
          <p className="text-sm text-gray-600">{formatDate(bet.created_at)}</p>
        </div>
        <span className={`font-bold ${outcomeColor}`}>
          {bet.outcome === 'won' ? '+' : '-'}{formatCurrency(bet.amount_sats / 100000000)} BTC
        </span>
      </div>
      
      <div className="text-sm">
        <p>Type: {bet.bet_type.toUpperCase()}</p>
        <p>Price: {bet.price}</p>
        {bet.outcome && <p>Outcome: {bet.outcome.toUpperCase()}</p>}
      </div>
    </div>
  )
} 