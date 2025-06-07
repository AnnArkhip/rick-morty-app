import {Text, StyleSheet, View} from "react-native"
import { useTheme } from "./ThemeContext";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";


export default function SettingsScreen(){
  const {darkTheme, toggleTheme} = useTheme();
  return(
    <GestureHandlerRootView style={[styles.container,{ backgroundColor: darkTheme?"#333333": "white" } ]}>
            <Text style={{color: darkTheme?"white":"#333333"}}>{darkTheme?"Dark Theme":"Light theme"}</Text>
            <Switch value={darkTheme} onChange={toggleTheme}></Switch>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});