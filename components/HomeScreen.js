import { FlatList, View, StyleSheet, ActivityIndicator, Text, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import SpeciesFilter from "./SpeciesFilter";
import StatusFilter from "./StatusFilter";

export default function HomeScreen(){
const [characters, setCharacters] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [status, setStatus] = useState('');
const [species, setSpecies] = useState('');


useEffect(() => {
  const fetchData = async() => {
  setLoading(true);
  
    try{
  const params = new URLSearchParams();
  if(status) params.append("status", status);
  if(species) params.append("species", species);
  
  const url = `https://rickandmortyapi.com/api/character?${params.toString()}`
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results)
    } catch(err) {
      setError(err.message)
    } finally{
      setLoading(false)
    }
  }
  fetchData();
  },[status, species])  //the effect will work when the data changes in the state

if(loading) return <ActivityIndicator  size="large"></ActivityIndicator> //loading indicator
if(error) return <Text>Error: {error}</Text>
  

return (
  <SafeAreaView style={styles.container}>
  <FlatList  data={characters} 
ListHeaderComponent={
  <View style={styles.filterContainer}>
  <View style={styles.singleFilter}>
  <StatusFilter selected={status} onChange={setStatus} />
  </View>
  <View style={styles.singleFilter}>
  <SpeciesFilter selected={species} onChange={setSpecies} />
  </View>
  </View>
    
  
}
  renderItem={({item}) => (
    <CharacterCard {...item}/>
  )}/>
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#333333"
  },
  filterContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%"
  },
  singleFilter:{
    flex:1
  },
})