import { Slot } from 'expo-router';
import { SessionProvider } from '../context/ctx';
import { Text } from 'react-native';

export default function Root() {
  
  return (
    <SessionProvider>

      <Slot />
  
    </SessionProvider>
  );
}
