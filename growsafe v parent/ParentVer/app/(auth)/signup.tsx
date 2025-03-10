import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signup } from '../../service/auth'; // assuming authService contains signup logic

const SignupScreen = () => {
  const [idp, setIdp] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [motpasse, setMotpasse] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    const signupData = {
      idp,
      nom,
      prenom,
      image,
      email,
      motpasse
    };

    try {
      const response = await signup(signupData); // call signup service
   
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
        placeholder="IDP"
        value={idp}
        onChangeText={setIdp}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
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

      <Button title="Sign Up" onPress={handleSignup} />
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

export default SignupScreen;
