import React, { useState } from "react";
import { View, Button, Image, Text } from "react-native";
import axios from "axios";

export default function App() {
  const [photo, setPhoto] = useState(null);

  const requestPhoto = async () => {
    await axios.post("http://localhost:5000/request-photo");
    alert("Photo request sent!");
  };

  const fetchPhoto = async () => {
    const res = await axios.get("http://localhost:5000/get-photo");
    setPhoto(res.data.image_url);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Take Picture" onPress={requestPhoto} />
      <Button title="Get Latest Photo" onPress={fetchPhoto} />
      {photo ? <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} /> : <Text>No photo yet</Text>}
    </View>
  );
}
