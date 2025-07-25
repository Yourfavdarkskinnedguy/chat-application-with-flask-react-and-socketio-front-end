import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Animated,
} from "react-native";

export default function lobbyscreen({ route, navigation}) {
  const { name } = route.params;
  const [groups, setGroups] = useState([]);
  console.log("groups:", groups);

  const handlecreategroup = () => {
    navigation.navigate("modal", {
      onCreateGroup: (newGroup) => {
        setGroups((prev) => [...prev, newGroup]);

      },
    });
  };

  

  return (
    <View style={styles.container}>
       
        
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.groups}
              onPress={()=>{
                const id = item.id;
                console.log('id checkkkk:', id)
                const groupname= item.name
                console.log('groupname checkkkk:', groupname)
                navigation.navigate('chat',
                     {groupname:groupname , user_name:name}

                )

              }}
            >
              <Text style={styles.grouptext}>{item.name}</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.flatlisttext}>Please create a lobby</Text>
        }
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      <TouchableOpacity onPress={handlecreategroup} style={styles.button}>
        <Text style={styles.buttonText}>CREATE LOBBY</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  grouptext: {
    fontSize: 20,
    paddingBottom: 15,
  },
  groups: {
    fontSize: 24,
    borderRadius: 3,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.1,
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  flatlisttext: {
    fontSize: 20,
    fontWeight: "300",
    marginTop: 100,
    textAlign: "center",
    color: "#888",
  },
  name: {
    fontSize: 28,
    fontWeight: "600",
    paddingHorizontal: 20,
    marginBottom: 15,
    
  },
  namecontainer:{
    backgroundColor:'#D7E4E2',
    padding:20,
    marginBlock:'auto'
  },
  button: {
    backgroundColor: "#194d33",
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
