import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CreateAccount from "./CreateAccount";



const Index = ({ navigation }) => {
  const [primaryButtonScale, setPrimaryButtonScale] = useState(1);
  const [secondaryButtonScale, setSecondaryButtonScale] = useState(1);

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
      <Text style={styles.bullet}>• Track location in real-time</Text>
      <Text style={styles.bullet}>• Set safe zones & get alerts</Text>
      <Text style={styles.bullet}>• Monitor app usage & screen time</Text>
      <Text style={styles.footer}>Let's create a secure digital space together.</Text>

      <TouchableOpacity
        style={[styles.primaryButton, { transform: [{ scale: primaryButtonScale }] }]}
        onPressIn={handlePrimaryPressIn}
        onPressOut={handlePrimaryPressOut}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, { transform: [{ scale: secondaryButtonScale }] }]}
        onPressIn={handleSecondaryPressIn}
        onPressOut={handleSecondaryPressOut}
        onPress={() => navigation.navigate("Login")}
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
  bullet: {
    fontSize: 16,
    color: "#D0D3E0", // Slightly Brighter Gray
    textAlign: "center",
    marginBottom: 5,
  },
  footer: {
    fontSize: 16,
    color: "#B0B3C1",
    marginTop: 20,
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
