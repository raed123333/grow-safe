import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './app/context/AuthProvider';
import Index from './app/screens/Index';
import SignupScreen from './app/screens/SignupScreen';
import SigninScreen from './app/screens/SigninScreen';
import HomeScreen from './app/screens/HomeScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

// Stack pour l'authentification
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Index" component={Index} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen name="SigninScreen" component={SigninScreen} />
  </Stack.Navigator>
);

// Stack pour l'application principale
const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
