import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axiosInstance from '@/lib/config';

export default function LinkEnfant() {
        const [idParent, setIdParent] = useState('');
        const [idEnfant, setIdEnfant] = useState('');

        const linkEnfantToParent = async () => {
                if (!idParent || !idEnfant) {
                        Alert.alert('Erreur', 'Veuillez entrer les deux identifiants.');
                        return;
                }

                try {
                        const response = await axiosInstance.post(`/parents/link/${idParent}/${idEnfant}`);
                        Alert.alert('Succès', 'Enfant lié avec succès !');
                } catch (error) {
                        console.error("Erreur lors de la liaison:", error);
                        Alert.alert('Erreur', 'Impossible de lier cet enfant.');
                }
        };

        return (
                <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Lier un enfant à un parent</Text>
                        <TextInput
                                placeholder="ID Parent"
                                value={idParent}
                                onChangeText={setIdParent}
                                keyboardType="numeric"
                                style={{
                                        borderWidth: 1,
                                        padding: 10,
                                        marginBottom: 10,
                                        borderRadius: 5
                                }}
                        />
                        <TextInput
                                placeholder="ID Enfant"
                                value={idEnfant}
                                onChangeText={setIdEnfant}
                                keyboardType="numeric"
                                style={{
                                        borderWidth: 1,
                                        padding: 10,
                                        marginBottom: 10,
                                        borderRadius: 5
                                }}
                        />
                        <Button title="Lier l'enfant" onPress={linkEnfantToParent} />
                </View>
        );
}
