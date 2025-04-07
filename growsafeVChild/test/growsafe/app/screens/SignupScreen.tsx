
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, StatusBar } from "react-native";
import axios from "axios";
import DeviceInfo from "react-native-device-info";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Définition des types de navigation
type RootStackParamList = {
        SignupScreen: undefined;
        Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SignupScreen">;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
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
                                navigation.navigate("Home");
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
                        <StatusBar barStyle="light-content" />

                        <Text style={styles.title}>Bienvenue sur GrowSafe Kids</Text>
                        <Text style={styles.subtitle}>Sécurité et fun pour vos enfants</Text>

                        <Image source={require("../../assets/images/photo.png")} style={styles.logo} />

                        <TextInput
                                placeholder="Nom"
                                value={nom}
                                onChangeText={setNom}
                                style={styles.input}
                                placeholderTextColor="#B0B3C1"
                        />
                        <TextInput
                                placeholder="Prénom"
                                value={prenom}
                                onChangeText={setPrenom}
                                style={styles.input}
                                placeholderTextColor="#B0B3C1"
                        />
                        <TextInput
                                placeholder="Mot de passe"
                                value={motpasse}
                                onChangeText={setMotpasse}
                                secureTextEntry
                                style={styles.input}
                                placeholderTextColor="#B0B3C1"
                        />

                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                                <Text style={styles.buttonText}>Créer mon compte</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>🌍 Votre IP : {ip}</Text>
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
                marginBottom: 20,
                textAlign: "center",
        },
        input: {
                width: "90%",
                backgroundColor: "#25273E",
                color: "#FFFFFF",
                borderRadius: 12,
                padding: 14,
                marginBottom: 15,
                fontSize: 16,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
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
        },
        buttonText: {
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "bold",
        },
        info: {
                marginTop: 15,
                fontSize: 14,
                color: "#B0B3C1",
        },
});

export default SignupScreen;
