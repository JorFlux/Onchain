/**
 * Format currency value with appropriate symbol and abbreviation
 * @param value - The numeric value to format
 * @param currencyType - The currency type ('USD' or 'HKD')
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currencyType: string): string => {
  const symbol = currencyType === 'USD' ? '$' : 'HK$';

  if (value > 1000000) {
    return `${symbol}${(value / 1000000).toFixed(2)}M`;
  } else if (value > 1000) {
    return `${symbol}${(value / 1000).toFixed(2)}K`;
  }

  return `${symbol}${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format percentage value with sign
 * @param value - The percentage value to format
 * @returns Formatted percentage string with sign
 */
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

/**
 * Format holdings amount with appropriate abbreviation
 * @param holdings - The holdings amount
 * @param symbol - The cryptocurrency symbol
 * @returns Formatted holdings string
 */
export const formatHoldings = (holdings: number, symbol: string): string => {
  if (holdings > 1000000) {
    return `${(holdings / 1000000).toFixed(2)}M ${symbol}`;
  } else if (holdings > 1000) {
    return `${(holdings / 1000).toFixed(2)}K ${symbol}`;
  }
  return `${holdings.toLocaleString()} ${symbol}`;
};

import { CryptoAsset } from './types';

export function filterAssets(
  assets: CryptoAsset[],
  query: string,
): CryptoAsset[] {
  return assets.filter(
    asset =>
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(query.toLowerCase()),
  );
}

export function sortAssets(
  assets: CryptoAsset[],
  sortBy: 'value' | 'name' | 'change',
  currency: string,
): CryptoAsset[] {
  return [...assets].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return currency === 'USD'
          ? b.valueUSD - a.valueUSD
          : b.valueHKD - a.valueHKD;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'change':
        return b.priceChangePercentage24h - a.priceChangePercentage24h;
      default:
        return 0;
    }
  });
}
