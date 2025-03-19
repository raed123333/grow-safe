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
  return <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="tachometer" color={color} />,
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: 'chat',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="snapchat" color={color} />,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
      }}
    />
    <Tabs.Screen
      name="controleParental"
      options={{
        title: 'controle',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="navicon" color={color} />,
      }}
    />
    <Tabs.Screen
      name="linkenfant"
      options={{
        title: 'controle',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="navicon" color={color} />,
      }}
    />
  </Tabs>
}
