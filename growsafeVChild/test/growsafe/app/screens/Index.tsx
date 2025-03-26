import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Définition des types de navigation
type RootStackParamList = {
        Index: undefined;
        SignupScreen: undefined;
        Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

const Index: React.FC<Props> = ({ navigation }) => {
        return (
                <View style={styles.container}>
                        <StatusBar barStyle="light-content" />

                        <Text style={styles.title}>Bienvenue sur GrowSafe Kids</Text>
                        <Text style={styles.subtitle}>Sécurité et fun pour vos enfants</Text>

                        <Image source={require("../../assets/images/photo.png")} style={styles.logo} />

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignupScreen")}>
                                <Text style={styles.buttonText}>Créer un compte</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate("Login")}>
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
                marginBottom: 20,
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
                marginBottom: 10,
        },
        secondaryButton: {
                backgroundColor: "#25273E",
        },
        buttonText: {
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "bold",
        },
        secondaryButtonText: {
                color: "#A0A3C1",
                fontSize: 16,
        },
});

export default Index;
