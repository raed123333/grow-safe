import { useSession } from '@/context/ctx';
import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

export default function Enfants() {
        const { session } = useSession();
        const navigation = useNavigation();
        let data = session?.enfants || [];

        const renderItem = ({ item }) => (
                <TouchableOpacity style={styles.itemContainer}>
                        <Link href="../controleParental">
                                <Text style={styles.itemText}>Nom: {item.nom}</Text>
                                <Text style={styles.itemText}> || Prénom: {item.prenom}</Text>
                                <Text style={styles.itemText}> || IP: {item.ip}</Text>
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
                                        contentContainerStyle={styles.listContent}
                                />
                        )}
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#282C34',
                padding: 20,
                paddingTop: 60, // 👈 Increased top padding
                alignItems: 'center',
        },
        title: {
                fontSize: 24,
                fontWeight: '700',
                color: '#4682B4',
                marginBottom: 20,
                textAlign: 'center',
                textTransform: 'uppercase',
        },
        itemContainer: {
                backgroundColor: '#4B5A6A',
                borderRadius: 12,
                padding: 20,
                marginBottom: 15,
                width: '100%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 6,
        },
        itemText: {
                fontSize: 16,
                color: '#FFFFFF',
                marginBottom: 6,
                textAlign: 'left',
        },
        noData: {
                fontSize: 16,
                color: '#B0B3C1',
                textAlign: 'center',
        },
        listContent: {
                paddingBottom: 20,
                width: '100%',
        },
});
