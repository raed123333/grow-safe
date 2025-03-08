import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types"; // Import the types
import { StackNavigationProp } from "@react-navigation/stack";
import { Link } from 'expo-router';

const Index = () => {
  const [primaryButtonScale, setPrimaryButtonScale] = useState(1);
  const [secondaryButtonScale, setSecondaryButtonScale] = useState(1);

  // Type the navigation hook
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePrimaryPressIn = () => {
    setPrimaryButtonScale(1.1); // Zoom in the button
  };

  const handlePrimaryPressOut = () => {
    setPrimaryButtonScale(1); // Reset zoom
  };

  const handleSecondaryPressIn = () => {
    setSecondaryButtonScale(1.1); // Zoom in the button
  };

  const handleSecondaryPressOut = () => {
    setSecondaryButtonScale(1); // Reset zoom
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to GrowSafe</Text>
      <Text style={styles.subtitle}>Your child's safety is our priority.</Text>
      
      
      {/* Primary Button */}
      <TouchableOpacity
        style={[styles.primaryButton, { transform: [{ scale: primaryButtonScale }] }]}
        onPressIn={handlePrimaryPressIn}
        onPressOut={handlePrimaryPressOut}
        
      >
      <Link href="/screens/CreateAccount" asChild>
      
        <Text style={styles.buttonText}>Créer un compte</Text>
        </Link>
      </TouchableOpacity>

      {/* Secondary Button */}
      <TouchableOpacity
        style={[styles.secondaryButton, { transform: [{ scale: secondaryButtonScale }] }]}
        onPressIn={handleSecondaryPressIn}
        onPressOut={handleSecondaryPressOut}
        onPress={() => navigation.navigate("Login")} // Navigate to Login screen (if exists)
      >
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2D", // Dark Blue-Gray Background
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF", // White Title
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#B0B3C1", // Light Gray Subtitle
    marginBottom: 15,
    textAlign: "center",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#007BFF", // Blue Primary Button
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  secondaryButton: {
    marginTop: 15,
    backgroundColor: "#3A3F55", // Dark Gray Secondary Button
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // White Text for Buttons
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Index;
