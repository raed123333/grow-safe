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
        onPress={nativeAndroidActivity}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Native code page 1 activity2
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
          Native code page 2 activity3
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
