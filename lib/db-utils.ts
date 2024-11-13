import pool from './db';
import { QueryResult } from 'pg';

export async function createBet(userId: number, marketId: number, betType: 'yes' | 'no', amountSats: number, price: number): Promise<QueryResult> {
  return pool.query(
    'INSERT INTO bets (user_id, market_id, bet_type, amount_sats, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [userId, marketId, betType, amountSats, price]
  );
}

export async function getMarketPrices(marketId: number): Promise<QueryResult> {
  return pool.query(
    'SELECT * FROM market_prices WHERE market_id = $1 ORDER BY timestamp DESC LIMIT 100',
    [marketId]
  );
}

export async function getBetsHistory(userId: string) {
  try {
    const bets = await pool.query(
      'SELECT * FROM bets WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )
    
    return bets.rows
  } catch (error) {
    console.error('Error fetching betting history:', error)
    throw new Error('Failed to fetch betting history')
  }
}

// Add more database utility functions as needed 