import { useSession } from '@/context/ctx';
import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

export default function Enfants() {
        const { session, signOut } = useSession();
        let data = session?.enfants || []; // Ensure it's not null or undefined

        const renderItem = ({ item }) => (
                <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Nom: {item.nom}</Text>
                        <Text style={styles.itemText}>Prénom: {item.prenom}</Text>
                        <Text style={styles.itemText}>IP: {item.ip}</Text>
                        {/* Add more fields as necessary */}
                </View>
        );

        return (
                <View style={styles.container}>
                        <Text style={styles.title}>Liste des enfants</Text>

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
                backgroundColor: '#f2f2f2',
                padding: 20,
        },
        title: {
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
        },
        itemContainer: {
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 15,
                marginBottom: 10,
                width: '100%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
        },
        itemText: {
                fontSize: 16,
                color: '#333',
        },
        noData: {
                fontSize: 18,
                color: '#999',
                textAlign: 'center',
        },
});
