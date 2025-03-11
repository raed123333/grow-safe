import { useSession } from "@/context/ctx";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
    const { session, isLoading } = useSession();
      if (isLoading) {
        return <Text>Loading...</Text>;
      }
    
     if (session) {
        
        return <Redirect href="/home" />;
      }
    
    
    
    
    return (
        <Stack >

            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
    )
}    
