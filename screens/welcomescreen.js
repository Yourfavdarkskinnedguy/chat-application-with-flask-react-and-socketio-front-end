import { Button } from "@react-navigation/elements";
Pressable

import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Pressable,
} from "react-native";

const imagestouse = require("../assets/images/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg");

export default function welcomescreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [errors, setError] = useState({});

  const validateform = () => {
    let errors = {};
    if (!username) errors.username = "Username is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleformsubmit = () => {

    if (validateform()) {
      setUsername("");
      setError("");
      navigation.navigate('lobby', 
        {
          name: username
        })
    }

  };

  return (
    <ImageBackground source={imagestouse} style={styles.backgroundImage}>
      <View style={styles.formContainer}>
        <Text style={styles.getstarted}>Welcome</Text>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Enter username"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.username ? <Text style={styles.errormsg}>{errors.username}</Text> : null}
        <Button style={styles.button} onPress={handleformsubmit}>
          <Text style={styles.buttontext}>Get Started</Text>
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#194d33",
    marginTop: 45,
  },
  errormsg:{
    color: 'red',
    padding:6
  },
  getstarted: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "#D7E4E2",
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 20,
    marginTop: 250,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: 600,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  buttontext: {
    color: "#fff",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
  },
});
