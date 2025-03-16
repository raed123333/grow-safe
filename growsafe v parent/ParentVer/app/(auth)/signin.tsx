import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { login } from '../../service/auth'; 
import { router } from 'expo-router';
import { useSession } from '@/context/ctx';

const SigninScreen = () => {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [motpasse, setMotpasse] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async () => {
    const signupData = { email, motpasse };

    try {
      const response = await login(signupData); 
      if (response?.parent) {
        signIn(response.parent);
        router.replace('/home'); 
      } else {
        setError('Identifiants invalides');
      }
    } catch (err) {
      setError('Connexion échouée. Réessayez.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

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

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      {/* Add the "Créer un compte" button */}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Créer un compte</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B3C1',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '85%',
    backgroundColor: '#3A3F55',
    borderRadius: 8,
    paddingLeft: 15,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '85%',
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#3A3F55',
    padding: 15,
    borderRadius: 8,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SigninScreen;
