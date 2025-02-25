import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  NativeModules,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

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

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      }}>
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
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
          gestion de temps
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
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
          block app
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
