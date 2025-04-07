import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import axiosInstance from "@/lib/config";
import { router } from 'expo-router';

export default function LinkEnfant() {
        const [idParent, setIdParent] = useState("");
        const [idEnfant, setIdEnfant] = useState("");
        const [buttonScale, setButtonScale] = useState(1);

        const linkEnfantToParent = async () => {
                if (!idParent || !idEnfant) {
                        Alert.alert("Erreur", "Veuillez entrer les deux identifiants.");
                        return;
                }

                try {
                        await axiosInstance.post(`/parents/link/${idParent}/${idEnfant}`);
                        router.replace('/(growsafe)/controleParental');
                        Alert.alert("Succès", "Enfant lié avec succès !");

                } catch (error) {
                        console.error("Erreur lors de la liaison:", error);
                        Alert.alert("Erreur", "Impossible de lier cet enfant.");
                }
        };

        return (
                <View style={styles.container}>
                        <Text style={styles.title}>Lier un enfant à un parent</Text>

                        <TextInput
                                placeholder="ID Parent"
                                placeholderTextColor="#B0B3C1"
                                value={idParent}
                                onChangeText={setIdParent}
                                keyboardType="numeric"
                                style={styles.input}
                        />

                        <TextInput
                                placeholder="ID Enfant"
                                placeholderTextColor="#B0B3C1"
                                value={idEnfant}
                                onChangeText={setIdEnfant}
                                keyboardType="numeric"
                                style={styles.input}
                        />

                        <Pressable
                                style={[styles.button, { transform: [{ scale: buttonScale }] }]}
                                onPressIn={() => setButtonScale(1.1)}
                                onPressOut={() => setButtonScale(1)}
                                onPress={linkEnfantToParent}
                        >
                                <Text style={styles.buttonText}>Lier l'enfant</Text>
                        </Pressable>
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
                fontSize: 24,
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: 20,
                textAlign: "center",
        },
        input: {
                width: "90%",
                backgroundColor: "#2D2D3A",
                borderRadius: 8,
                padding: 15,
                marginBottom: 15,
                color: "#FFFFFF",
                fontSize: 16,
        },
        button: {
                backgroundColor: "#007BFF",
                padding: 15,
                borderRadius: 8,
                width: "90%",
                alignItems: "center",
                marginTop: 10,
        },
        buttonText: {
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "bold",
        },
});
