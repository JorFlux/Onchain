import AssetScreen from './AssetScreen';
import CurrencyPickerScreen from './CurrencyPickerScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AssetScreen"
        options={{ headerShown: false }}
        component={AssetScreen}
      />
      <Stack.Screen name="CurrencyPicker" component={CurrencyPickerScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
