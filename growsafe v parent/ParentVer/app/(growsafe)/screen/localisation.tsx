import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Localisation() {
        const [location, setLocation] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        const fetchLocation = async () => {
                setLoading(true);
                try {
                        const res = await fetch('http://192.168.1.111:5555/get-location');
                        const data = await res.json();
                        setLocation(data);
                        setError(null);
                } catch (err) {
                        console.error('Failed to fetch location:', err);
                        setError('Failed to fetch location');
                }
                setLoading(false);
        };

        // Auto-refresh every 40 seconds
        useEffect(() => {
                fetchLocation(); // initial fetch
                const interval = setInterval(() => {
                        fetchLocation();
                }, 40000); // 40 seconds

                return () => clearInterval(interval); // cleanup on unmount
        }, []);

        if (loading && !location) {
                return (
                        <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="blue" />
                                <Text>Loading satellite map...</Text>
                        </View>
                );
        }

        if (error && !location) {
                return (
                        <View style={styles.loadingContainer}>
                                <Text>{error}</Text>
                                <Button title="Retry" onPress={fetchLocation} />
                        </View>
                );
        }

        return (
                <View style={styles.container}>
                        <MapView
                                style={styles.map}
                                mapType="satellite"
                                initialRegion={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                }}
                        >
                                <Marker
                                        coordinate={{
                                                latitude: location.latitude,
                                                longitude: location.longitude,
                                        }}
                                        title="Current Location"
                                        description={location.address}
                                />
                        </MapView>
                        <View style={styles.buttonContainer}>
                                <Button title="Refresh Now" onPress={fetchLocation} />
                        </View>
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
        },
        map: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
        },
        buttonContainer: {
                position: 'absolute',
                bottom: 40,
                alignSelf: 'center',
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 10,
                padding: 5,
        },
});
