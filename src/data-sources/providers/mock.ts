import type { DataSource } from '..';
import type { FinancialsResult, NewsResult, PriceHistoryResult, SearchResultItem, Ticker } from '../types';

export class MockDataSource implements DataSource {
  async getPriceHistory(ticker: Ticker, range: string = '1y'): Promise<PriceHistoryResult> {
    const today = new Date();
    const bars = Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (30 - i));
      const base = 100 + i;
      return {
        date: d.toISOString().slice(0, 10),
        open: base - 1,
        high: base + 1,
        low: base - 2,
        close: base,
        volume: 100000 + i * 1000,
      };
    });
    return { ticker, currency: 'IDR', bars };
  }

  async getFinancials(ticker: Ticker, period: 'annual' | 'quarter' = 'annual'): Promise<FinancialsResult> {
    return {
      ticker,
      statements: [
        { period: '2024', type: 'income', data: { revenue: 1000000, netIncome: 120000 } },
        { period: '2024', type: 'balance', data: { totalAssets: 5000000, totalLiabilities: 2000000 } },
        { period: '2024', type: 'cashflow', data: { operatingCF: 150000, capex: -50000 } },
      ],
    };
  }

  async getNews(ticker: Ticker, limit: number = 10): Promise<NewsResult> {
    const now = new Date().toISOString();
    return {
      ticker,
      items: [
        {
          title: `${ticker} earnings preview`,
          url: 'https://example.com/news/1',
          source: 'MockWire',
          publishedAt: now,
          sentiment: 'neutral',
        },
      ],
    };
  }

  async search(query: string): Promise<SearchResultItem[]> {
    if (!query) return [];
    return [
      { symbol: 'BBCA.JK', name: 'Bank Central Asia Tbk', exchange: 'IDX', currency: 'IDR' },
      { symbol: 'TLKM.JK', name: 'Telkom Indonesia', exchange: 'IDX', currency: 'IDR' },
    ];
  }
}
