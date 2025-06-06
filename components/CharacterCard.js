import { View, StyleSheet, Image, Text } from "react-native";

export default function CharacterCard({name,status,species,image}){

  return(
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.image}/>
      <View style={styles.details} >
      <Text style={styles.name}>{name}</Text>
      <View style={styles.textContainer}>
      <Text style={styles.detailText}>{status}</Text>
      <Text style={styles.detailText}>{species}</Text>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,

  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
 
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  details: {
    flex:1,
    flexDirection: 'column',
  },
  detailText: {
    color: '#ccc',
    fontSize: 14,
  },
})
 


 