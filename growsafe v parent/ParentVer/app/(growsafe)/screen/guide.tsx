import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guide pour les Parents</Text>
      <Text style={styles.subtitle}>Votre sécurité, notre priorité.</Text>

      {/* Logo between text and steps */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/photo.png')} // replace with the correct path to your logo
          style={styles.logo}
        />
      </View>

      {/* Steps */}
      <Text style={styles.step}>Première étape :</Text>
      <Text style={styles.description}>
        Vous devez ajouter l'ID de votre enfant pour commencer le contrôle parental.
      </Text>

      {/* Remarque section with added styling */}
      <Text style={styles.remarque}>
        Remarque : Vous pouvez trouver l'ID de votre enfant dans l'application enfant, dans la section "Profil".
      </Text>

      <Text style={styles.step}>Deuxième étape :</Text>
      <Text style={styles.description}>
        Connectez l'appareil de votre enfant à votre compte parental.
      </Text>

      <Text style={styles.step}>Troisième étape :</Text>
      <Text style={styles.description}>
        Configurez le contrôle parental et surveillez en toute sécurité.
      </Text>

      {/* Button to add a child */}
      <TouchableOpacity style={styles.primaryButton}>
        <Link href="/linkenfant" asChild>
          <Text style={styles.buttonText}>Ajouter votre premier enfant</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

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
  logoContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  step: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "gray",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  remarque: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
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
});
