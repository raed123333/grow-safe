import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signup } from '../../service/auth';

type RootStackParamList = {
  Home: undefined; // Change 'Home' to your main screen name
  Signup: undefined;
};

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [motpasse, setMotpasse] = useState('');
  const [error, setError] = useState('');

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setImage(`data:image/jpeg;base64,${image.base64}`);
      } else {
        console.log("No image selected");
      }
    } catch (err) {
      console.error("Error picking image:", err);
    }
  };

  const handleSignup = async () => {
    if (!nom || !prenom || !email || !motpasse) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    const signupData = { nom, prenom, image, email, motpasse };
    try {
      const response = await signup(signupData);
      console.log('Signup successful', response);
      Alert.alert("Succès", "Compte créé avec succès !", [
        { text: "OK", onPress: () => navigation.replace("Home") } // Navigate after successful signup
      ]);
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>Inscrivez-vous pour commencer</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Choisir une image</Text>
        )}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nom" placeholderTextColor="#B0B3C1" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Prénom" placeholderTextColor="#B0B3C1" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#B0B3C1" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mot de Passe" placeholderTextColor="#B0B3C1" secureTextEntry value={motpasse} onChangeText={setMotpasse} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#B0B3C1',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#3A3F55',
    borderRadius: 8,
    paddingLeft: 10,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3F55',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    color: '#B0B3C1',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
