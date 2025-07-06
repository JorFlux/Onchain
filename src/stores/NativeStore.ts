import { create } from 'zustand';
import NativeStoreValueManager from '../../specs/NativeStoreValueManager';

const useNativeStore = create(() => ({
  currency: NativeStoreValueManager.getSelectedCurrencyValue() || 'USD',
}));
export default useNativeStore;
