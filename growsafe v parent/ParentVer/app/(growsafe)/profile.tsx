import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSession } from '../../context/ctx';
import { useNavigation } from '@react-navigation/native';
import { AvatarBaseURL } from '@/lib/config';

const Profile = () => {
  const { session, signOut } = useSession();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  console.log(session);

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.text}>Chargement...</Text>
      </View>
    );
  }

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirmation",
      "Si vous supprimez votre compte, le compte de votre enfant sera également supprimé. Voulez-vous continuer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.1.101:3000/parents/${session.parent.idp}`, {
                method: "DELETE",
              });

              if (response.ok) {
                Alert.alert("Compte supprimé", "Votre compte et celui de votre enfant ont été supprimés.");
                signOut();
                navigation.reset({ index: 0, routes: [{ name: "Home" }] });
              } else {
                const errorMessage = await response.text();
                Alert.alert("Erreur", `Impossible de supprimer le compte. Détails : ${errorMessage}`);
              }
            } catch (error) {
              console.error("Erreur de suppression:", error);
              Alert.alert("Erreur", `Une erreur est survenue : ${error.message}`);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${AvatarBaseURL}/${session.image}` }}
        style={styles.profileImage}
      />


      <Text style={styles.name}>{session.parent.nom} {session.parent.prenom}</Text>
      <Text style={styles.email}>{session.parent.email}</Text>
      <Text style={styles.text}>Mot de Passe: {session.parent.motpasse}</Text>
      <Text style={styles.text}>ID Parent: {session.parent.idp}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Supprimer le compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2D',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#B0B3C1',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#B0B3C1',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
