import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { useTheme } from "./ThemeContext";


const Tab = createBottomTabNavigator();
export default function BottomTabs(){
  const {darkTheme} = useTheme();
  return(
    <Tab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: darkTheme ? '#333' : '#fff',},
      borderTopColor: darkTheme ? '#555' : '#eee',
      tabBarActiveBackgroundColor: darkTheme ? '#333' : '#fff',
      headerShown: false
    }}>
            <Tab.Screen name="Main" component={HomeScreen}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
    </Tab.Navigator>


  )
}