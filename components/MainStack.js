import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsCharacter from './DetailsCharacter';
import { useTheme } from './ThemeContext';

const Stack = createNativeStackNavigator(); //navigation between screens

export default function MainStack() {
  const {darkTheme} = useTheme();
  return (
    <Stack.Navigator screenOptions={({ route }) => ({ 
      headerStyle: {
        backgroundColor: darkTheme ? '#333' : '#fff', 
      },
      headerTintColor: darkTheme ? '#fff' : '#000',   
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsCharacter} />
    </Stack.Navigator>
  );
}