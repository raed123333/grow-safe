import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { login } from '../../service/auth'; // assuming authService contains signup logic
import { router } from 'expo-router';
import { useSession } from '@/context/ctx';




const SigninScreen = () => {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [motpasse, setMotpasse] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async () => {
    const signupData = {
      email,
      motpasse
    };

    try {
      const response = await login(signupData); 
      signIn();
      // Navigate after signing in. You may want to tweak this to ensure sign-in is
      // successful before navigating.
      router.replace('/home');// call signup service
   
      console.log('Signup successful', response);
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de Passe"
        secureTextEntry
        value={motpasse}
        onChangeText={setMotpasse}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Sign In" onPress={handleSignin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8
  },
  error: {
    color: 'red',
    marginBottom: 12
  }
});

export default SigninScreen;
