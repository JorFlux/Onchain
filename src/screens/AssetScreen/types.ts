export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  holdings: number;
  valueUSD: number;
  valueHKD: number;
  icon: string;
}
