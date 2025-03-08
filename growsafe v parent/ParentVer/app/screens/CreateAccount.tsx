import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

const CreateAccount = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const[image,setImage] = useState("");
  const [email, setEmail] = useState("");
  const [motpasse, setMotpasse] = useState("");

  const handleCreateAccount = async () => {
    // Validate form inputs
    if (!nom || !prenom || !image || !email || !motpasse) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    // Make API call to create parent account
    try {
      const response = await fetch("http://localhost:3000/parents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom,
          prenom,
          image,
          email,
          motpasse,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Account Created", "Please check your email to verify your account.");
        
      } else {
        Alert.alert("Error", result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      Alert.alert("Error", "Could not create account. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prenom"
        value={prenom}
        onChangeText={setPrenom}
      />
      <TextInput
        style={styles.input}
        placeholder="image"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de Passe"
        value={motpasse}
        onChangeText={setMotpasse}
        secureTextEntry
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Retour à la Connexion</Text>
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
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
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

export default CreateAccount;
