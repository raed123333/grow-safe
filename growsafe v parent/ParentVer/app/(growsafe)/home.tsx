import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSession } from '../../context/ctx';

export default function Home() {
  const { session, signOut } = useSession();
  console.log(session);

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>Bienvenue, {session?.nom} {session?.prenom} !</Text>

      {/* Marketing Section */}
      <View style={styles.marketingSection}>
        <Text style={styles.marketingTitle}>Découvrez nos services exclusifs !</Text>
        <Text style={styles.marketingDescription}>
          Explorez les fonctionnalités uniques que nous offrons pour améliorer la sécurité et la gestion de vos enfants, à portée de main.
        </Text>
        <Image
          source={require('../../assets/images/home.png')} // Add your marketing image
          style={styles.marketingImage}
        />
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#282C34',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4682B4', // New color for the greeting (SteelBlue)
    marginBottom: 20,
  },
  marketingSection: {
    backgroundColor: '#4B5A6A',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20, // Reduced the margin between the card and button
    alignItems: 'center',
  },
  marketingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  marketingDescription: {
    fontSize: 16,
    color: '#B0B3C1',
    marginBottom: 20,
    textAlign: 'center',
    width: '80%',
  },
  marketingImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 15,
  },
  signOutButton: {
    backgroundColor: '#1E90FF', // Blue color for button
    padding: 12, // Increased padding for bigger button
    borderRadius: 8,
    width: '70%', // Adjusted width to make the button larger
    alignItems: 'center',
    marginTop: 10, // Reduced space between button and card
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16, // Adjusted font size for the bigger button
    fontWeight: 'bold',
  },
});
