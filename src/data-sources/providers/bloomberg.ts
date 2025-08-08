import type { DataSource } from '..';
import type { FinancialsResult, NewsResult, PriceHistoryResult, SearchResultItem, Ticker } from '../types';

/**
 * Bloomberg provider stub.
 * Note: Bloomberg BLPAPI requires server-side integration (certificates and session to Desktop API/Server API).
 * In this frontend project, implement calls via your server or Supabase Edge Functions, then consume from here.
 */
export class BloombergDataSource implements DataSource {
  private notImplemented<T>(): Promise<T> {
    return Promise.reject(
      new Error('Bloomberg provider requires server-side integration via Edge Functions or your backend. Not implemented in frontend.')
    );
  }

  getPriceHistory(_ticker: Ticker, _range?: string): Promise<PriceHistoryResult> {
    return this.notImplemented<PriceHistoryResult>();
  }

  getFinancials(_ticker: Ticker, _period?: 'annual' | 'quarter'): Promise<FinancialsResult> {
    return this.notImplemented<FinancialsResult>();
  }

  getNews(_ticker: Ticker, _limit?: number): Promise<NewsResult> {
    return this.notImplemented<NewsResult>();
  }

  search(_query: string): Promise<SearchResultItem[]> {
    return this.notImplemented<SearchResultItem[]>();
  }
}
