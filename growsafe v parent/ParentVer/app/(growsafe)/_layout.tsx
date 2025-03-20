import { Text } from 'react-native';
import { Redirect } from 'expo-router';

import { useSession } from '../../context/ctx';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function AppLayout() {
  const { session, isLoading } = useSession();


  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/signin" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Tabs screenOptions={{ tabBarActiveTintColor: '#261FB3', tabBarInactiveTintColor: '#FBE4D6', tabBarStyle: { backgroundColor: '#8AB2A6' }, }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        href: null,
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
        headerShown: false,
      }}
    />

    <Tabs.Screen
      name="screen/block"
      options={{
        href: null,
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="screen/guide"
      options={{
        href: null,
        headerShown: false,
      }}
    />


    <Tabs.Screen
      name="linkenfant"
      options={{
        href: null,
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="controleParental"
      options={{
        href: null,
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="screen/enfants"
      options={{
        title: 'enfants',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        headerShown: false
      }}
    />
    <Tabs.Screen
      name="home"
      options={{ headerShown: false }}
    />

  </Tabs>
}
