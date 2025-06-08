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

