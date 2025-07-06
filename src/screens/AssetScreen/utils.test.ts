import { filterAssets, sortAssets } from './utils';
import { CryptoAsset } from './types';

describe('filterAssets', () => {
  const mockAssets: CryptoAsset[] = [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 100,
      priceChange24h: 1,
      priceChangePercentage24h: 2,
      holdings: 1,
      valueUSD: 100,
      valueHKD: 800,
      icon: '₿',
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 50,
      priceChange24h: -1,
      priceChangePercentage24h: -2,
      holdings: 2,
      valueUSD: 100,
      valueHKD: 800,
      icon: 'Ξ',
    },
  ];

  it('should filter by name', () => {
    expect(filterAssets(mockAssets, 'bit')).toHaveLength(1);
    expect(filterAssets(mockAssets, 'bit')[0].symbol).toBe('BTC');
  });

  it('should filter by symbol', () => {
    expect(filterAssets(mockAssets, 'eth')).toHaveLength(1);
    expect(filterAssets(mockAssets, 'eth')[0].name).toBe('Ethereum');
  });

  it('should be case-insensitive', () => {
    expect(filterAssets(mockAssets, 'BIT')).toHaveLength(1);
    expect(filterAssets(mockAssets, 'ETH')).toHaveLength(1);
  });

  it('should return all if query is empty', () => {
    expect(filterAssets(mockAssets, '')).toHaveLength(2);
  });
});

describe('sortAssets', () => {
  const mockAssets: CryptoAsset[] = [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 100,
      priceChange24h: 1,
      priceChangePercentage24h: 2,
      holdings: 1,
      valueUSD: 100,
      valueHKD: 800,
      icon: '₿',
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 50,
      priceChange24h: -1,
      priceChangePercentage24h: -2,
      holdings: 2,
      valueUSD: 200,
      valueHKD: 1600,
      icon: 'Ξ',
    },
  ];

  it('should sort by value (USD)', () => {
    const sorted = sortAssets(mockAssets, 'value', 'USD');
    expect(sorted[0].symbol).toBe('ETH');
    expect(sorted[1].symbol).toBe('BTC');
  });

  it('should sort by value (HKD)', () => {
    const sorted = sortAssets(mockAssets, 'value', 'HKD');
    expect(sorted[0].symbol).toBe('ETH');
    expect(sorted[1].symbol).toBe('BTC');
  });

  it('should sort by name', () => {
    const sorted = sortAssets(mockAssets, 'name', 'USD');
    expect(sorted[0].name).toBe('Bitcoin');
    expect(sorted[1].name).toBe('Ethereum');
  });

  it('should sort by change', () => {
    const sorted = sortAssets(mockAssets, 'change', 'USD');
    expect(sorted[0].symbol).toBe('BTC');
    expect(sorted[1].symbol).toBe('ETH');
  });
});
