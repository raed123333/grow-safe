import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { signup } from '../../service/auth';

const SignupScreen = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [motpasse, setMotpasse] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    const signupData = {  nom, prenom, image, email, motpasse };
    try {
      const response = await signup(signupData);
      console.log('Signup successful', response);
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#B0B3C1"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor="#B0B3C1"
        value={prenom}
        onChangeText={setPrenom}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        placeholderTextColor="#B0B3C1"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0B3C1"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de Passe"
        placeholderTextColor="#B0B3C1"
        secureTextEntry
        value={motpasse}
        onChangeText={setMotpasse}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#3A3F55',
    color: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
