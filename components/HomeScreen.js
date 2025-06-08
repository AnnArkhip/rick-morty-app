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
const [page,setPage] = useState(1); //current page
const [nextPage, setNextPage] = useState(true); //does it have next page
const [isLoadingMore, setIsLoadingMore] = useState(false); //only one request until the previous one is loaded


useEffect(() => {
  const fetchData = async() => {
  setLoading(true);
  setPage(1);
  setNextPage(true);
  
    try{
  const params = new URLSearchParams();
  if(status) params.append("status", status);
  if(species) params.append("species", species);
  params.append("page", "1"); //when changing the filter, we reset the page, the presence of the following pages, and the heroes
  
  const url = `https://rickandmortyapi.com/api/character?${params.toString()}`
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);  
      setNextPage(!!data.info.next);   
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
  

 const loadMore = async () => {
  if (!nextPage || isLoadingMore ) return; //we do not load the next page if it does not exist or it is already loading

  setIsLoadingMore(true);

  try {
    const nextPage = page + 1;

    const params = new URLSearchParams();
    if(status) params.append("status", status);
    if(species) params.append("species", species);
    params.append("page", nextPage.toString());

    const url = `https://rickandmortyapi.com/api/character?${params.toString()}`
      const response = await fetch(url);
      const data = await response.json();

      setCharacters(prev=> [...prev, ...data.results]);
      setPage(nextPage);
      setNextPage(!!data.info?.next)
  } catch (err){
    setError(err.message)
  } finally {
    setIsLoadingMore(false)
  }
 };

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
onEndReached={loadMore} //runs when we reach the end of the list
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
    
  },
  singleFilter:{
    flex:1
  },
})