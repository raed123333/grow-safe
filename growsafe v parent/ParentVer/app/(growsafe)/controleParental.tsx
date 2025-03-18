import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const ControleParental = () => {
  const router = useRouter();

  const handleAction = (actionName) => {
    Alert.alert("Action Triggered", `You clicked the ${actionName} button!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle Parental</Text>
      <Text style={styles.subtitle}>Gérez et surveillez les activités</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleAction("Take Picture")}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleAction("Capture Screen")}>
        <Text style={styles.buttonText}>Capture Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleAction("Gestion de Temps")}>
        <Text style={styles.buttonText}>Gestion de Temps</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleAction("Localisation")}>
        <Text style={styles.buttonText}>Localisation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() =>router.navigate('/screen/block') }>
        <Text style={styles.buttonText}>Block Apps</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#B0B3C1',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ControleParental;
