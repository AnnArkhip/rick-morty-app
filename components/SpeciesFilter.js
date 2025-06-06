import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function SpeciesFilter({selected, onChange}){

  return(
    <View style={styles.container}>
    <Text style={styles.text}>Species:</Text>
    <View style={styles.pickerContainer}>
    <Picker selectedValue={selected}
    onValueChange={(value)=> onChange(value)} style={styles.picker} itemStyle={styles.itemPicker}>
      <Picker.Item label="All" value=""/>
      <Picker.Item label="Human" value="human"/>
      <Picker.Item label="Alien" value="alien"/>
    </Picker>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    
  },
  pickerContainer:{
   width: "100%",
  },
  picker:{
    width: "100%"
  },
  text:{
    color:"white"
  },
  itemPicker:{
    color: '#ccc',
  }
})