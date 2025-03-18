import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getEnfantApps, lockEnfantApps } from '@/service/apps'; // Path to your API file
import { Ionicons } from '@expo/vector-icons'; // You can use any icon library you prefer

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
        Alert.alert('Success', response.message); // Display success message
      } catch (error) {
        Alert.alert('Error', 'Error locking app'); // Display error message
      }
    } else {
      Alert.alert('Input Error', 'Please provide both package name and password.');
    }
  };

  const handleAppPress = (app: any) => {
    setPackageName(app.packageName); // Set the package name in input
    setAppName(app.appName); // Set the app name to display in input
    if (app.isLocked) {
      setPassword(app.password); // Set the password to the input when app is locked
    } else {
      setPassword(''); // Clear password if app is not locked
    }
  };

  return (
    <View style={styles.container}>
      {/* App List */}
      <Text style={styles.header}>App List</Text>
      <FlatList
        data={apps}
        keyExtractor={(item) => item.packageName}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.appItem}
            onPress={() => handleAppPress(item)}
          >
            <Ionicons
              name={item.isLocked ? 'lock-closed' : 'lock-open'}
              size={24}
              color={item.isLocked ? 'red' : 'green'}
            />
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{item.appName}</Text>
              {item.isLocked && <Text style={styles.lockedText}>Locked</Text>}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Lock App Section */}
      <TextInput
        style={styles.input}
        placeholder="App Name"
        value={appName}
        editable={false} // Disable editing the app name
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Lock App" onPress={handleLockApp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  appInfo: {
    marginLeft: 10,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
  },
  lockedText: {
    fontSize: 12,
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
});

export default Block;
