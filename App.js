import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddCreditScreen from './screens/AddcreditScreen';
import CreditListScreen from './screens/CreditListScreen';
import CreditDetail_Screen from './screens/CreditDetail_Screen';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#621FF7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="AddCreditScreen"
        component={AddCreditScreen}
        options={{ title: 'Calcular Crédito' }}
      />
      <Stack.Screen
          name="CreditListScreen"
          component={CreditListScreen}
          options={{ title: 'Lista de créditos' }}
      />
      <Stack.Screen
          name="CreditDetail_Screen"
          component={CreditDetail_Screen}
          options={{ title: 'Detalles del crédito' }}
      />
     
      
      
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}