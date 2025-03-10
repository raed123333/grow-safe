import { useSession } from "@/context/ctx";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
    const { session, isLoading } = useSession();
      if (isLoading) {
        return <Text>Loading...</Text>;
      }
    
     if (session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/home" />;
      }
    
    
    
    
    return (
        <Stack >

            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
    )
}    
