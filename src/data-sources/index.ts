import type { FinancialsResult, NewsResult, PriceHistoryResult, SearchResultItem, Ticker } from './types';
import { BloombergDataSource } from './providers/bloomberg';
import { MockDataSource } from './providers/mock';

export interface DataSource {
  getPriceHistory(ticker: Ticker, range?: string): Promise<PriceHistoryResult>;
  getFinancials(ticker: Ticker, period?: 'annual' | 'quarter'): Promise<FinancialsResult>;
  getNews(ticker: Ticker, limit?: number): Promise<NewsResult>;
  search(query: string): Promise<SearchResultItem[]>;
}

function chooseDataSource(): DataSource {
  const name = (import.meta.env.VITE_DATA_PROVIDER_PRIMARY || 'mock').toString().toLowerCase();
  switch (name) {
    case 'bloomberg':
      return new BloombergDataSource();
    case 'yahoo':
    case 'fmp':
    case 'alpha_vantage':
      // Until server/edge functions exist, fall back to mock to keep app stable
      return new MockDataSource();
    default:
      return new MockDataSource();
  }
}

export const dataSource: DataSource = chooseDataSource();
