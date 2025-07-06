import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { EventEmitter } from 'react-native/Libraries/Types/CodegenTypes';
export type KeyValuePair = {
  key: string;
  value: string;
};
export interface Spec extends TurboModule {
  getSelectedCurrencyValue(): string | null;
  onSelectedCurrencyChanged: EventEmitter<KeyValuePair>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeStoreValueManager',
);
