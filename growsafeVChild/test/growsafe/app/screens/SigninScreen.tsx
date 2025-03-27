import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, StatusBar, Image } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from '../context/AuthProvider';

type RootStackParamList = {
        SigninScreen: undefined;
        HomeScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SigninScreen">;

const SigninScreen: React.FC<Props> = ({ navigation }) => {
        const { login } = useAuth();
        const [nom, setNom] = useState('');
        const [motpasse, setMotpasse] = useState('');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const handleSignin = async () => {
                if (!nom || !motpasse) {
                        Alert.alert("Erreur", "Veuillez remplir tous les champs.");
                        return;
                }

                setLoading(true);
                setError(null);

                try {
                        const response = await axios.post('http://192.168.1.101:3000/enfants/loginEnfant', {
                                nom,
                                motpasse
                        });

                        Alert.alert("Succès", "Connexion réussie !");
                        console.log("Données de l'enfant:", response.data);
                        login(response.data.idenf, response.data.nom, response.data.motpasse);

                } catch (err: any) {
                        const errorMessage = err.response?.data?.error || "Une erreur s'est produite";
                        setError(errorMessage);
                        Alert.alert("Erreur", errorMessage);
                } finally {
                        setLoading(false);
                }
        };

        return (
                <View style={styles.container}>
                        <StatusBar barStyle="light-content" />

                        <Text style={styles.title}>Connexion Enfant</Text>
                        <Text style={styles.subtitle}>Sécurisez l'accès pour vos enfants</Text>

                        <Image source={require("../../assets/images/photo.png")} style={styles.logo} />

                        <TextInput
                                value={nom}
                                onChangeText={setNom}
                                placeholder="Nom"
                                placeholderTextColor="#B0B3C1"
                                style={styles.input}
                        />

                        <TextInput
                                value={motpasse}
                                onChangeText={setMotpasse}
                                placeholder="Mot de passe"
                                placeholderTextColor="#B0B3C1"
                                secureTextEntry
                                style={styles.input}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleSignin} disabled={loading}>
                                <Text style={styles.buttonText}>{loading ? "Connexion..." : "Se connecter"}</Text>
                        </TouchableOpacity>

                        {error && <Text style={styles.error}>{error}</Text>}
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
        error: {
                marginTop: 10,
                fontSize: 14,
                color: "red",
        },
});

export default SigninScreen;
