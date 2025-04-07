import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';

type UsageStat = {
  packageName: string;
  usageTime: number; // in seconds
};

export default function GestionTemps() {
  const [data, setData] = useState<UsageStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const fetchUsageStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.111:8080/usage');
      const json = await response.json();
      setData(json.usageStats);
    } catch (error) {
      console.error('Failed to fetch usage stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageStats();
  }, []);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const extractAppName = (packageName: string): string => {
    const parts = packageName.split('.');
    return parts[parts.length - 1];
  };

  const renderItem = ({ item }: { item: UsageStat }) => (
    <View style={styles.item}>
      <Text style={styles.packageName}>{extractAppName(item.packageName)}</Text>
      <Text style={styles.usageTime}>🕒 {formatTime(item.usageTime)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📱 Stats d'Utilisation des Applications</Text>
      <TouchableOpacity onPress={fetchUsageStats} style={styles.primaryButton}>
        <Text style={styles.buttonText}>🔄 Rafraîchir</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#00aaff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          style={{ marginTop: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#1E1E2D',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#3A3F55',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  usageTime: {
    marginTop: 5,
    fontSize: 14,
    color: '#B0B3C1',
  },
  primaryButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
