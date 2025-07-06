import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonItem = () => {
  return (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonIcon} />
        <View style={styles.skeletonText}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonSubtitle} />
        </View>
        <View style={styles.skeletonValue}>
          <View style={styles.skeletonAmount} />
          <View style={styles.skeletonHoldings} />
        </View>
      </View>
      <View style={styles.skeletonFooter}>
        <View style={styles.skeletonPrice} />
        <View style={styles.skeletonChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
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
  skeletonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeletonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  skeletonText: {
    flex: 1,
  },
  skeletonTitle: {
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 4,
    width: '60%',
  },
  skeletonSubtitle: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    width: '40%',
  },
  skeletonValue: {
    alignItems: 'flex-end',
  },
  skeletonAmount: {
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 4,
    width: 80,
  },
  skeletonHoldings: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    width: 60,
  },
  skeletonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonPrice: {
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    width: 60,
  },
  skeletonChange: {
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    width: 50,
  },
});

export default SkeletonItem;
