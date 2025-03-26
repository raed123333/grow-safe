// import React from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  NativeModules,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useAuth } from '../context/AuthProvider';

function HomeScreen({navigation}:any) {
  const isDarkMode = useColorScheme() === 'dark';
  const { user, logout } = useAuth();

  const nativeAndroidActivity = () => {
    if (NativeModules.LoaderModule?.launchARSession) {
      NativeModules.LoaderModule.launchARSession();
    } else {
      console.warn('Native module not found: launchARSession');
    }
  };

  const nativeAndroidActivity2 = () => {
    if (NativeModules.LoaderModule?.launchARSession1) {
      NativeModules.LoaderModule.launchARSession1();
    } else {
      console.warn('Native module not found: launchARSession1');
    }
  };

  const nativeAndroidActivity3 = () => {
    if (NativeModules.LoaderModule?.launchARSession2) {
      NativeModules.LoaderModule.launchARSession2();
    } else {
      console.warn('Native module not found: launchARSession1');
    }
  };


  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      }}>

<TouchableOpacity
        style={{
          width: 300,
          height: 60,
          backgroundColor: 'teal',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        onPress={handleLogout}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
         logout
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 300,
          height: 60,
          backgroundColor: 'teal',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        onPress={nativeAndroidActivity}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Time managment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 300,
          height: 60,
          backgroundColor: 'teal',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        onPress={nativeAndroidActivity2}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          App Blocker
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 300,
          height: 60,
          backgroundColor: 'teal',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        onPress={nativeAndroidActivity3}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          localisation
        </Text>
      </TouchableOpacity>
      


    </SafeAreaView>
  );
}

export default HomeScreen;