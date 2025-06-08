import React, { useLayoutEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

export default function DetailsCharacter({ route, navigation }) {
  const { character } = route.params;
  const {darkTheme} = useTheme();

  useLayoutEffect(() => {  //title of the current screen, Triggered before rendering the component
    navigation.setOptions({ title: character.name }); 
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={[styles.container,{ backgroundColor: darkTheme?"#333333": "white" } ]}>
      <Image source={{ uri: character.image }} style={styles.image} />
      
      

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>Status:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{character.status}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>Species:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{character.species}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>Gender:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{character.gender}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>Type:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{character.type || "Unknown"}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>Origin:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{character.origin.name}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>Location:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{character.location.name}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>First Episode:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{character.episode[0]}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={[styles.label,{color: darkTheme?"white":"#333333"}]}>Created:</Text>
        <Text style={{color: darkTheme?"white":"#333333"}}>{new Date(character.created).toLocaleDateString()}</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex:1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailBox: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});