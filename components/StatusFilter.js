import { View, Text, StyleSheet} from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function StatusFilter({selected, onChange}){

  return(
    <View style={styles.container}>
      <Text style={styles.text} >Status:</Text>
      <View style={styles.pickerContainer}>
      <Picker selectedValue={selected}
      onValueChange={(value)=> onChange(value)} style={styles.picker} itemStyle={styles.itemPicker}>
        <Picker.Item label="All" value=""/>
        <Picker.Item label="Alive" value="alive"/>
        <Picker.Item label="Dead" value="dead"/>
        <Picker.Item label="unknown" value="unknown"/>
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
