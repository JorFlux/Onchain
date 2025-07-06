import { View } from 'react-native';
import CurrencyPickerNativeComponent from '../../../specs/CurrencyPickerNativeComponent';

const CurrencyPickerScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CurrencyPickerNativeComponent
        style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
      />
    </View>
  );
};

export default CurrencyPickerScreen;
