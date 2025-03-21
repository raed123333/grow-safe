import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Link } from 'expo-router';

export type RootStackParamList = {
  Index: undefined;
  CreateAccount: undefined;
};

const Index = () => {
  const [primaryButtonScale, setPrimaryButtonScale] = useState(1);
  const [secondaryButtonScale, setSecondaryButtonScale] = useState(1);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePrimaryPressIn = () => {
    setPrimaryButtonScale(1.1);
  };

  const handlePrimaryPressOut = () => {
    setPrimaryButtonScale(1);
  };

  const handleSecondaryPressIn = () => {
    setSecondaryButtonScale(1.1);
  };

  const handleSecondaryPressOut = () => {
    setSecondaryButtonScale(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GrowSafe</Text>
      <Text style={styles.subtitle}>Your child's safety is our priority.</Text>

      {/* Logo between text and buttons */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/photo.png')} // replace with the correct path to your logo
          style={styles.logo}
        />
      </View>

      {/* Primary Button */}
      <TouchableOpacity
        style={[styles.primaryButton, { transform: [{ scale: primaryButtonScale }] }]}
        onPressIn={handlePrimaryPressIn}
        onPressOut={handlePrimaryPressOut}
      >
        <Link href="/(auth)/signup" asChild>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </Link>
      </TouchableOpacity>

      {/* Secondary Button */}
      <TouchableOpacity
        style={[styles.secondaryButton, { transform: [{ scale: secondaryButtonScale }] }]}
        onPressIn={handleSecondaryPressIn}
        onPressOut={handleSecondaryPressOut}
      >
        <Link href="/(auth)/signin" asChild>
          <Text style={styles.buttonText}>connexion</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2D",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#B0B3C1",
    marginBottom: 15,
    textAlign: "center",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  secondaryButton: {
    marginTop: 15,
    backgroundColor: "#3A3F55",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoContainer: {
    marginVertical: 20,  // Adds space between the logo and other elements
    alignItems: "center",
  },
  logo: {
    width: 150,   // Set the width of the logo
    height: 150,  // Set the height of the logo
    resizeMode: "contain",  // Ensure the logo scales properly
  },
});

export default Index;
