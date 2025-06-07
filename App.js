import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from "./components/BottomTabs";
import { ThemeProvider } from './components/ThemeContext';




export default function App() {

  return (
    <ThemeProvider>
      <NavigationContainer>
     <BottomTabs/>
    </NavigationContainer>
    </ThemeProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
