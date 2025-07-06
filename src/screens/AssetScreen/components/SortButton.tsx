import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SortButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const SortButton = ({ label, isActive, onPress }: SortButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.sortButton, isActive && styles.sortButtonActive]}
      onPress={onPress}
    >
      <Text
        style={[styles.sortButtonText, isActive && styles.sortButtonTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default SortButton;
