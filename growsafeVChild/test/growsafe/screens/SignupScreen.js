import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import DeviceInfo from "react-native-device-info";

const SignupScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [motpasse, setMotpasse] = useState("");
  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ipAddress = await DeviceInfo.getIpAddress();
        setIp(ipAddress);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'IP :", error);
      }
    };
    fetchIP();
  }, []);

  const handleSignup = async () => {
    if (!nom || !prenom || !motpasse) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires !");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.101:3000/enfants", {
        nom,
        prenom,
        motpasse,
        ip,
      });

      if (response.data.success) {
        Alert.alert("Succès", "Compte créé avec succès !");
        navigation.navigate("Home"); // Redirection vers la page principale
      } else {
        Alert.alert("Erreur", response.data.message);
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      Alert.alert("Erreur", "Impossible de s'inscrire. Vérifiez votre connexion.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />
      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={motpasse}
        onChangeText={setMotpasse}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <Text style={styles.info}>Votre IP : {ip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: "teal", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
  info: { marginTop: 10, fontSize: 16 },
});

export default SignupScreen;
