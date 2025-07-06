import { NavigationContainer } from '@react-navigation/native';
import NativeStoreValueManager from './specs/NativeStoreValueManager';
import React from 'react';
import useNativeStore from './src/stores/NativeStore';
import RootStack from './src/screens';

export default function App() {
  React.useEffect(() => {
    NativeStoreValueManager.onSelectedCurrencyChanged(event => {
      useNativeStore.setState({ currency: event.value });
    });
  }, []);
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
