import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import io from "socket.io-client";
import { useSession } from '../../context/ctx'; // Import session context

const socket = io("http://192.168.1.101:3000");

export default function App() {
  const { session } = useSession(); // Get session context
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const scrollViewRef = useRef();

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!receiverId || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const msgData = {
      sender_id: session?.nom, // Use session name as sender ID
      reciever_id: receiverId,
      message: message,
      message_time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      {/* Message List */}
      <ScrollView 
        style={styles.messagesContainer} 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View 
            key={index} 
            style={[
              styles.messageBubble, 
              msg.sender_id === session?.nom ? styles.sentMessage : styles.receivedMessage
            ]}
          >
            <Text style={styles.senderText}>{msg.sender_id}</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.timeText}>{msg.message_time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Fields */}
      <TextInput 
        placeholder="Receiver ID"
        value={receiverId}
        onChangeText={setReceiverId}
        style={styles.input}
        placeholderTextColor="#B0B3C1"
      />
      <TextInput 
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        placeholderTextColor="#B0B3C1"
      />

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2D",
    padding: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: "75%",
  },
  sentMessage: {
    backgroundColor: "#007BFF",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#3A3F55",
    alignSelf: "flex-start",
  },
  senderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  messageText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginVertical: 2,
  },
  timeText: {
    fontSize: 10,
    color: "#B0B3C1",
    alignSelf: "flex-end",
  },
  input: {
    height: 50,
    backgroundColor: "#3A3F55",
    borderRadius: 8,
    paddingLeft: 15,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
