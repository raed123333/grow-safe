// import React from 'react';
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

  const nativeAndroidActivity3 = () => {
    if (NativeModules.LoaderModule?.launchARSession2) {
      NativeModules.LoaderModule.launchARSession2();
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

export default App;


// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
// import { io } from "socket.io-client";

// const socket = io("http://192.168.1.11:3000");

// const App = () => {
//     const [username, setUsername] = useState("");
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         socket.on("chatHistory", (chatHistory) => {
//             setMessages(chatHistory);
//         });

//         socket.on("receiveMessage", (newMessage) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         return () => {
//             socket.off("chatHistory");
//             socket.off("receiveMessage");
//         };
//     }, []);

//     const handleJoin = () => {
//         if (username.trim()) {
//             socket.emit("join", username);
//             setIsLoggedIn(true);
//         }
//     };

//     const sendMessage = () => {
//         if (message.trim()) {
//             const newMessage = { sender: username, message };
//             socket.emit("sendMessage", newMessage);
//             setMessage("");
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {!isLoggedIn ? (
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         placeholder="Enter your name"
//                         value={username}
//                         onChangeText={setUsername}
//                         style={styles.input}
//                     />
//                     <Button title="Join Chat" onPress={handleJoin} />
//                 </View>
//             ) : (
//                 <View style={styles.chatContainer}>
//                     <FlatList
//                         data={messages}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }) => (
//                             <View
//                                 style={[
//                                     styles.messageBubble,
//                                     item.sender === username ? styles.myMessage : styles.otherMessage,
//                                 ]}
//                             >
//                                 <Text style={styles.sender}>{item.sender}:</Text>
//                                 <Text style={styles.message}>{item.message}</Text>
//                             </View>
//                         )}
//                     />
//                     <TextInput
//                         placeholder="Type a message"
//                         value={message}
//                         onChangeText={setMessage}
//                         style={styles.input}
//                     />
//                     <Button title="Send" onPress={sendMessage} />
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: "center", padding: 20 },
//     inputContainer: { alignItems: "center" },
//     chatContainer: { flex: 1, justifyContent: "flex-end" },
//     input: { borderWidth: 1, padding: 10, width: "100%", marginBottom: 10, borderRadius: 5 },
//     messageBubble: { padding: 10, marginVertical: 5, borderRadius: 8 },
//     myMessage: { backgroundColor: "#dcf8c6", alignSelf: "flex-end" },
//     otherMessage: { backgroundColor: "#eee", alignSelf: "flex-start" },
//     sender: { fontWeight: "bold" },
//     message: { fontSize: 16 },
// });

// export default App;
