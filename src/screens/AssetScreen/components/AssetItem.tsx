import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatCurrency, formatPercentage, formatHoldings } from '../utils';

interface CryptoAsset {
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

interface AssetItemProps {
  item: CryptoAsset;
  currency: string;
}

const AssetItem = ({ item, currency }: AssetItemProps) => {
  return (
    <TouchableOpacity style={styles.assetItem}>
      <View style={styles.assetHeader}>
        <View style={styles.assetInfo}>
          <View style={styles.iconContainer}>
            <Text style={styles.assetIcon}>{item.icon}</Text>
          </View>
          <View style={styles.assetDetails}>
            <Text style={styles.assetName}>{item.name}</Text>
            <Text style={styles.assetSymbol}>{item.symbol}</Text>
          </View>
        </View>
        <View style={styles.assetValues}>
          <Text numberOfLines={2} style={styles.assetValue}>
            {formatCurrency(
              currency === 'USD' ? item.valueUSD : item.valueHKD,
              currency,
            )}
          </Text>
          <Text numberOfLines={2} style={styles.assetHoldings}>
            {formatHoldings(item.holdings, item.symbol)}
          </Text>
        </View>
      </View>

      <View style={styles.assetFooter}>
        <Text numberOfLines={2} style={styles.currentPrice}>
          {formatCurrency(item.currentPrice, currency)}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.priceChange,
            {
              color: item.priceChangePercentage24h >= 0 ? '#00C851' : '#FF4444',
            },
          ]}
        >
          {formatPercentage(item.priceChangePercentage24h)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  assetItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  assetDetails: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  assetSymbol: {
    fontSize: 14,
    color: '#6B7280',
  },
  assetValues: {
    alignItems: 'flex-end',
    maxWidth: '50%',
  },
  assetValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
    flex: 1,
  },
  assetHoldings: {
    fontSize: 14,
    color: '#6B7280',
  },
  assetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  priceChange: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AssetItem;
