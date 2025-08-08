// Shared data source types

export type Ticker = string; // e.g., "BBCA.JK"

export interface PriceBar {
  date: string; // ISO date
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface PriceHistoryResult {
  ticker: Ticker;
  currency?: string;
  bars: PriceBar[];
}

export interface FinancialStatement {
  period: string; // e.g., 2024-Q4 or 2024
  type: 'income' | 'balance' | 'cashflow';
  data: Record<string, number | string | null>;
}

export interface FinancialsResult {
  ticker: Ticker;
  statements: FinancialStatement[];
}

export interface NewsItem {
  id?: string;
  ticker?: Ticker;
  title: string;
  source?: string;
  url: string;
  publishedAt: string; // ISO datetime
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface NewsResult {
  ticker: Ticker;
  items: NewsItem[];
}

export interface SearchResultItem {
  symbol: Ticker;
  name: string;
  exchange?: string;
  currency?: string;
}
