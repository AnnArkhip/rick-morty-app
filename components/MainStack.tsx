import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsCharacter from './DetailsCharacter';
import { useTheme } from './ThemeContext';
import { Character } from './DetailsCharacter';

export type StackParams = {
  Home: undefined;
  Details: { character: Character };
};
const Stack = createNativeStackNavigator<StackParams>();

export default function MainStack() {
  const { darkTheme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: darkTheme ? '#333' : '#fff',
        },
        headerTintColor: darkTheme ? '#fff' : '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsCharacter} />
    </Stack.Navigator>
  );
}
