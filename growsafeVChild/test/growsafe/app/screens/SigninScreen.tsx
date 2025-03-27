import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from '../context/AuthProvider';


// Définition des types de navigation
type RootStackParamList = {
        SigninScreen: undefined;
        HomeScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SigninScreen">;

const SigninScreen: React.FC<Props> = ({ navigation }) => {
        const { login } = useAuth()
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
                        login(response.data.idenf, response.data.nom ,response.data.motpasse);

                } catch (err: any) {
                        const errorMessage = err.response?.data?.error || "Une erreur s'est produite";
                        setError(errorMessage);
                        Alert.alert("Erreur", errorMessage);
                } finally {
                        setLoading(false);
                }
        };

        return (
                <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Connexion Enfant</Text>

                        <Text>Nom :</Text>
                        <TextInput
                                value={nom}
                                onChangeText={setNom}
                                placeholder="Entrez votre nom"
                                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                        />

                        <Text>Mot de passe :</Text>
                        <TextInput
                                value={motpasse}
                                onChangeText={setMotpasse}
                                placeholder="Entrez votre mot de passe"
                                secureTextEntry
                                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                        />

                        <Button title={loading ? "Connexion..." : "Se connecter"} onPress={handleSignin} disabled={loading} />

                        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
                </View>
        );
};

export default SigninScreen;
