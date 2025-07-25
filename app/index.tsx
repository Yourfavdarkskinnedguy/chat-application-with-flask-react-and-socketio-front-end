import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import welcomescreen from "../screens/welcomescreen";
import chatscreen from "../screens/chatscreen";
import lobbyscreen from "../screens/lobbyscreen";
import modal from "../screens/creategroupmodal";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [groupdata, setgroupdata]= useState('')
  console.log('groupData in app.js is', groupdata)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcome"
        component={welcomescreen}
        options={{
          title: "Welcome",
          headerStyle: {
            backgroundColor: "#D7E4E2",
          },
        }}
      />
      <Stack.Screen
        name="lobby"
        component={lobbyscreen}
        options={{
          title: "Lobby",
          //headerShown: false,
          headerStyle: {
            backgroundColor: "#D7E4E2",
          },
        }}

        
      />

      <Stack.Screen
        name="modal"
        component={modal}
        options={{
          title: "Enter room name",
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
       name="chat" 
       component={chatscreen} 
       options={{
        headerStyle: {
          backgroundColor: "#D7E4E2",
        },
      }}
       
       />
    </Stack.Navigator>
  );
}
