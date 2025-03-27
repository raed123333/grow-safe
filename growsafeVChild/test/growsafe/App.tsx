import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './app/context/AuthProvider';
import Index from './app/screens/Index';
import SignupScreen from './app/screens/SignupScreen';
import SigninScreen from './app/screens/SigninScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="index" component={Index} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
