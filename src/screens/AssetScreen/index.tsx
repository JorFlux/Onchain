import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useNativeStore from '../../stores/NativeStore';
import currencyData from './Currency.json';
import fiatRateHKD from './Fiat_rate_hkd.json';
import fiatRateUSD from './Fiat_rate_usd.json';
import { formatCurrency, filterAssets, sortAssets } from './utils';
import { AssetItem, SortButton, SkeletonItem } from './components';
import { FlashList } from '@shopify/flash-list';

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

interface CurrencyData {
  name: string;
  symbol: string;
  id: number;
  amount: number;
}

interface FiatRateData {
  fiat_rate: string;
  fiat_symbol: string;
  id: number;
  symbol: string;
}

type SortOption = 'value' | 'name' | 'change';

const cryptoIcons: { [key: string]: string } = {
  BTC: '₿',
  ETH: 'E',
  CRO: 'C',
  SOL: 'S',
  MATIC: 'M',
  ATOM: 'A',
  DOGE: 'D',
};

const AssetScreen = () => {
  const navigation = useNavigation();
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<CryptoAsset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('value');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const selectedCurrency = useNativeStore(state => state.currency);

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback((text: string) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setSearchQuery(text);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const processAssets = useCallback(() => {
    const processedAssets: CryptoAsset[] = currencyData.map(
      (currency: CurrencyData) => {
        const hkdRate = fiatRateHKD.find(
          (rate: FiatRateData) => rate.symbol === currency.symbol,
        );
        const usdRate = fiatRateUSD.find(
          (rate: FiatRateData) => rate.symbol === currency.symbol,
        );

        const currentPriceUSD = usdRate ? parseFloat(usdRate.fiat_rate) : 0;
        const currentPriceHKD = hkdRate ? parseFloat(hkdRate.fiat_rate) : 0;
        const valueUSD = currency.amount * currentPriceUSD;
        const valueHKD = currency.amount * currentPriceHKD;
        const priceChangePercentage24h = (Math.random() - 0.5) * 20;
        const priceChange24h =
          currentPriceUSD * (priceChangePercentage24h / 100);

        return {
          id: currency.id.toString(),
          symbol: currency.symbol,
          name: currency.name.charAt(0).toUpperCase() + currency.name.slice(1),
          currentPrice: currentPriceUSD,
          priceChange24h,
          priceChangePercentage24h,
          holdings: currency.amount,
          valueUSD,
          valueHKD,
          icon: cryptoIcons[currency.symbol] || currency.symbol,
        };
      },
    );

    return processedAssets;
  }, []);

  const loadAssets = useCallback(async () => {
    setIsLoading(true);
    const processedAssets = processAssets();
    setAssets(processedAssets);
    setFilteredAssets(processedAssets);
    setIsLoading(false);
  }, [processAssets]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadAssets();
    setIsRefreshing(false);
  }, [loadAssets]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  useEffect(() => {
    let filtered = filterAssets(assets, searchQuery);
    filtered = sortAssets(filtered, sortBy, selectedCurrency);
    setFilteredAssets(filtered);
  }, [assets, searchQuery, sortBy, selectedCurrency]);

  const renderAssetItem = React.useCallback(
    ({ item }: { item: CryptoAsset }) => (
      <AssetItem item={item} currency={selectedCurrency} />
    ),
    [selectedCurrency],
  );

  const totalValue = React.useMemo(
    () =>
      assets.reduce(
        (sum, asset) =>
          sum + (selectedCurrency === 'USD' ? asset.valueUSD : asset.valueHKD),
        0,
      ),
    [assets, selectedCurrency],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Onchain</Text>
        <TouchableOpacity
          style={styles.currencyToggle}
          onPress={() => navigation.navigate('CurrencyPicker' as never)}
        >
          <Text style={styles.currencyToggleText}>{selectedCurrency}</Text>
        </TouchableOpacity>
      </View>

      {/* Total Value */}
      <View style={styles.totalValueContainer}>
        <Text style={styles.totalValueLabel}>Total Value</Text>
        <Text style={styles.totalValueAmount}>
          {formatCurrency(totalValue, selectedCurrency)}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cryptocurrencies..."
          placeholderTextColor="#9CA3AF"
          onChangeText={handleSearchChange}
        />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <SortButton
          label="Value"
          isActive={sortBy === 'value'}
          onPress={() => setSortBy('value')}
        />
        <SortButton
          label="Name"
          isActive={sortBy === 'name'}
          onPress={() => setSortBy('name')}
        />
        <SortButton
          label="Change"
          isActive={sortBy === 'change'}
          onPress={() => setSortBy('change')}
        />
      </View>

      {/* Assets List */}
      {isLoading ? (
        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={SkeletonItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          estimatedItemSize={100}
        />
      ) : (
        <FlashList
          data={filteredAssets}
          renderItem={renderAssetItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="#6366F1"
              colors={['#6366F1']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No cryptocurrencies found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  currencyToggle: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  currencyToggleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  totalValueContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  totalValueLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  totalValueAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  sortButtonActive: {
    backgroundColor: '#6366F1',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  sortButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
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
    flex: 1,
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
  },
  assetValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default AssetScreen;
