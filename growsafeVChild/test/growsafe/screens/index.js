import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const Index = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleCreateAccount = () => {
    navigation.navigate("SignupScreen"); // Ensure 'Signup' screen exists in your navigator
  };

  const handleLogin = () => {
    navigation.navigate("Login"); // Ensure 'Login' screen exists in your navigator
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Title */}
      <Text style={styles.title}>Bienvenue sur GrowSafe Kids</Text>
      <Text style={styles.subtitle}>Sécurité et fun pour vos enfants </Text>

      {/* Logo */}
      <Image source={require("../assets/images/photo.png")} style={styles.logo} />

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleLogin}>
        <Text style={styles.secondaryButtonText}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16182D",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#A0A3C1",
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF6B81",
    paddingVertical: 14,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    shadowColor: "#FF6B81",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#25273E",
    shadowColor: "#000",
    shadowOpacity: 0.2,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Index;
