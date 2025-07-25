import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useId, useState } from "react";



export default function modal({ navigation, route }) {
  const [groupname, setgroupname] = useState("");
  const [errors, setError] = useState({});
  const [groups, setGroups] = useState([]);

  const validateform = () => {
    let errors = {};
    if (!groupname) errors.groupname = "group name is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handlemodalsubmit = () => {
    if (validateform()) {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const newGroup = { id, name: groupname };
  
      route.params.onCreateGroup(newGroup); 
  
      navigation.goBack();
    }
  };
  

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          padding: 30,
          borderRadius: 15,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={styles.creategroupheader}>CREATE GROUP</Text>
        <TextInput
          value={groupname}
          onChangeText={setgroupname}
          style={styles.input}
          placeholder="Enter group name"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.groupname ? <Text style={styles.errormsg}>{errors.groupname}</Text> : null}

        <Pressable style={styles.submitbtn} onPress={handlemodalsubmit}>
          <Text style={styles.submittext}>submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  submitbtn: {
    backgroundColor: "#194d33",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  submittext: {
    color: "#fff",
  },
  creategroupheader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  errormsg:{
    color:'red'
  }
});
