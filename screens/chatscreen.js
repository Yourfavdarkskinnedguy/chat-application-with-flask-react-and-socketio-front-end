import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DateTime } from "luxon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";

export default function chatscreen({}) {
  const navigation = useNavigation();
  const route = useRoute();

  const username = route.params?.user_name;
  const groupname = route.params?.groupname;

  

  const socket = io("http://172.20.10.3:5001");

  socket.on('connect', () => {
    console.log('Connected to server');
  });
  

  useEffect(() => {
    socket.emit("join", { groupname, username });

    socket.on("receive_message", (data) => {
      console.log('data received from flask is', data)
      if (data.groupname === groupname) {
        setMessageList((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [groupname]);

  useEffect(() => {
    navigation.setOptions({
      title: groupname || "Chat",
    });
  }, [groupname]);

  const [usermessage, setusermessage] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [activegroup, setactivegroup] = useState([]);
  const [messagesForGroup, setMessagesForGroup] = useState([]);
  //setactivegroup(groupname)

  console.log("message list:", messageList);

  //get data for message list
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("messages");
        if (jsonValue != null) {
          const parsed = JSON.parse(jsonValue);
          setMessageList(parsed);
        }
      } catch (e) {
        console.log("Error reading from AsyncStorage:", e);
      }
    };
    getData();
  }, []);


  //store data for msg
  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(messageList);
        await AsyncStorage.setItem("messages", jsonValue);
      } catch (e) {
        console.log("Error writing to AsyncStorage:", e);
      }
    };
    storeData();
  }, [messageList]);

  useEffect(() => {
    setactivegroup(groupname);
    const filtered = messageList.filter((msg) => msg.groupname === activegroup);
    setMessagesForGroup(filtered);
  }, [messageList, activegroup]);

  const handleMessageSubmit = () => {
    if (usermessage.trim() === "") return;

    const now = DateTime.local();
    const timeHHmm = now.toFormat("HH:mm");

    const newMessage = { username, groupname, usermessage, timeHHmm };
    //console.log("newMessage:", newMessage);
    setactivegroup(groupname);
    setMessageList((prev) => [...prev, newMessage]);

    socket.emit('send_message', newMessage);

    setusermessage("");
    //console.log(messageList)
  };

  //console.log('msg for group', messagesForGroup)

  return (
    <View style={styles.container}>
      <FlatList
        data={messagesForGroup}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isMyMessage = item.username === username;

          return (
            <View
              style={[
                styles.messagecontainer,
                isMyMessage ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.name}>{item.username}</Text>
              <Text style={styles.message}>{item.usermessage}</Text>
              <Text style={styles.time}>{item.timeHHmm}</Text>
            </View>
          );
        }}
      />

      <View style={styles.inputcontainer}>
        <TextInput
          value={usermessage}
          onChangeText={setusermessage}
          style={styles.textinput}
          placeholder="Enter message"
        />
        <Pressable onPress={handleMessageSubmit} style={styles.sendmsg}>
          <Text style={styles.sendmsgtext}>send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagecontainer: {
    backgroundColor: "#D7E4E2",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: "60%",
    alignSelf: "flex-end",
    marginRight: "10",
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    alignSelf: "flex-end",
    //backgroundColor:'#fff',
  },
  message: {
    fontSize: 17,
    fontWeight: 450,
    alignSelf: "flex-end",
  },
  time: {
    alignSelf: "flex-end",
    fontWeight: 350,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E6E6E6", 
  },
  textinput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  inputcontainer: {
    backgroundColor: "#D7E4E2",
    //padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    //backgroundColor: '#fff',
    alignItems: "center",
  },
  sendmsg: {
    marginTop: 15,
    height: 42,
    width: 68,
    textAlign: "center",
    backgroundColor: "#144701",
    borderRadius: 500000000,
    marginBottom: 8,
  },
  sendmsgtext: {
    padding: 10,
    paddingTop: 12,
    paddingLeft: 16,
    color: "#fff",
  },
  usermsg: {
    fontSize: 30,
  },
  flatlisttext: {
    fontSize: 30,
    fontWeight: "300",
    marginTop: 130,
    textAlign: "center",
    color: "#888",
  },
});
