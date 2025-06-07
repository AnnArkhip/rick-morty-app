import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { View } from "react-native";


const Tab = createBottomTabNavigator();
export default function BottomTabs(){
  return(
    <Tab.Navigator>
            <Tab.Screen name="Main" component={HomeScreen}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
    </Tab.Navigator>


  )
}