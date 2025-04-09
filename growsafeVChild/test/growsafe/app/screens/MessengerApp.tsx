// ChildApp.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import io from "socket.io-client";

const socket = io("http://192.168.1.101:3000"); // 🔁 Update IP

export default function MessengerApp() {
        const [messages, setMessages] = useState([]);
        const [message, setMessage] = useState("");
        const [username] = useState("Child" + Math.floor(Math.random() * 1000));

        useEffect(() => {
                socket.emit("joinRoom", "child");

                socket.on("receiveMessage", (msg) => {
                        setMessages((prev) => [...prev, msg]);
                });

                return () => {
                        socket.off("receiveMessage");
                };
        }, []);

        const sendMessage = () => {
                const msgData = {
                        user: username,
                        text: message,
                        time: new Date().toLocaleTimeString(),
                        senderApp: "child"
                };
                socket.emit("sendMessage", msgData);
                setMessage("");
        };

        return (
                <View style={{ flex: 1, padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>👦 Child Chat</Text>
                        <ScrollView style={{ marginVertical: 20 }}>
                                {messages.map((msg, index) => (
                                        <Text key={index} style={{ marginBottom: 10 }}>
                                                <Text style={{ fontWeight: "bold" }}>{msg.user}:</Text> {msg.text}{" "}
                                                <Text style={{ fontSize: 10 }}>({msg.time})</Text>
                                        </Text>
                                ))}
                        </ScrollView>
                        <TextInput
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Type a message..."
                                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                        />
                        <Button title="Send Message" onPress={sendMessage} />
                </View>
        );
}
