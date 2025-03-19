import { useSession } from '@/context/ctx';
import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

export default function Enfants() {
        const { session } = useSession();
        const navigation = useNavigation();
        let data = session?.enfants || []; // Ensure it's not null or undefined

        const renderItem = ({ item }) => (
                <TouchableOpacity
                        style={styles.itemContainer}
                >
                        <Link href="../controleParental">
                                <Text style={styles.itemText}>Nom: {item.nom}</Text>
                                <Text style={styles.itemText}>Prénom: {item.prenom}</Text>
                                <Text style={styles.itemText}>IP: {item.ip}</Text>
                        </Link>
                </TouchableOpacity>
        );

        return (
                <View style={styles.container}>
                        <Text style={styles.title}>Liste des Enfants</Text>

                        {data.length === 0 ? (
                                <Text style={styles.noData}>Aucun enfant trouvé</Text>
                        ) : (
                                <FlatList
                                        data={data}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.idenf.toString()}
                                />
                        )}
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1E1E2D', // Dark theme background
                padding: 20,
        },
        title: {
                fontSize: 26,
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginBottom: 20,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: 1,
        },
        itemContainer: {
                backgroundColor: '#3A3F55', // Darker card background
                borderRadius: 15, // More rounded
                padding: 20,
                marginBottom: 15,
                width: '95%', // Wider card
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 }, // Stronger shadow
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 10,
        },
        itemText: {
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '500',
                marginBottom: 5,
                marginRight: 40,
                marginLeft: 40,
        },
        noData: {
                fontSize: 18,
                color: '#B0B3C1',
                textAlign: 'center',
        },
});
