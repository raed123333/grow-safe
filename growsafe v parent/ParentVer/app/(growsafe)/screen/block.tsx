import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getEnfantApps, lockEnfantApps } from '@/service/apps'; // Path to your API file
import { Ionicons } from '@expo/vector-icons';

const Block = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [packageName, setPackageName] = useState('');
  const [password, setPassword] = useState('');
  const [appName, setAppName] = useState('');

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const appList = await getEnfantApps();
        setApps(appList);
      } catch (error) {
        console.error('Error fetching apps:', error);
      }
    };

    fetchApps();
  }, []);

  const handleLockApp = async () => {
    if (packageName && password) {
      try {
        const response = await lockEnfantApps(packageName, password);
        Alert.alert('Succès', response.message);
      } catch (error) {
        console.log(error.response);
        Alert.alert('Erreur', 'Échec du verrouillage de l\'application');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez entrer le nom de l\'application et le mot de passe.');
    }
  };

  const handleAppPress = (app: any) => {
    setPackageName(app.packageName);
    setAppName(app.appName);
    setPassword(app.isLocked ? app.password : '');
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.header}>🔒 Gérer les applications</Text>

      {/* App List */}
      <FlatList
        data={apps}
        keyExtractor={(item) => item.packageName}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.appItem, item.isLocked && styles.lockedApp]}
            onPress={() => handleAppPress(item)}
          >
            <Ionicons
              name={item.isLocked ? 'lock-closed' : 'lock-open'}
              size={24}
              color={item.isLocked ? '#FF4C4C' : '#00C853'}
            />
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{item.appName}</Text>
              {item.isLocked && <Text style={styles.lockedText}>Verrouillée</Text>}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Lock App Section */}
      <TextInput
        style={styles.input}
        placeholder="Nom de l'application"
        placeholderTextColor="#888"
        value={appName}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleLockApp}>
        <Text style={styles.buttonText}>🔒 Verrouiller l'application</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E2D',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#33384D',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444A63',
  },
  lockedApp: {
    borderColor: '#FF4C4C',
  },
  appInfo: {
    marginLeft: 10,
  },
  appName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  lockedText: {
    fontSize: 12,
    color: '#FF4C4C',
  },
  input: {
    height: 50,
    backgroundColor: '#33384D',
    borderRadius: 8,
    paddingLeft: 10,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Block;
