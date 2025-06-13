import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  SafeAreaView,
  Button,
} from 'react-native';
import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import SpeciesFilter from './SpeciesFilter';
import StatusFilter from './StatusFilter';
import { useTheme } from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Character } from './DetailsCharacter';

export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { darkTheme } = useTheme();
  const [offline, setOffline] = useState<boolean>(false);

  const loadCharacters = async () => {
    try {
      const res = await fetch(
        'https://rickandmortyapi.com/api/character?page=1'
      );
      const data = await res.json();

      await AsyncStorage.setItem(
        'cachedCharacters',
        JSON.stringify(data.results.slice(0, 20))
      );
      setCharacters(data.results);
    } catch (error) {
      setOffline(true);
      setError('No internet connection');

      const cached = await AsyncStorage.getItem('cachedCharacters');
      if (cached) {
        setCharacters(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const handleRetry = async () => {
    setError(null);
    await loadCharacters();
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPage(1);
      setNextPage(true);

      try {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (species) params.append('species', species);
        params.append('page', '1');

        const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        setCharacters(data.results);
        setNextPage(!!data.info.next);
      } catch (err: any) {
        setError(err.message);
        setOffline(true);
        const cached = await AsyncStorage.getItem('cachedCharacters');
        if (cached) {
          setCharacters(JSON.parse(cached));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [status, species]);

  if (loading) return <ActivityIndicator size="large"></ActivityIndicator>;
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
        <Button title="Try Again" onPress={handleRetry} />
      </View>
    );
  }

  const loadMore = async () => {
    if (!nextPage || isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;

      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (species) params.append('species', species);
      params.append('page', nextPage.toString());

      const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      setCharacters((prev) => [...prev, ...data.results]);
      setPage(nextPage);
      setNextPage(!!data.info?.next);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkTheme ? '#333333' : 'white' },
      ]}
    >
      <FlatList
        data={characters}
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
        onEndReached={loadMore}
        renderItem={({ item }) => <CharacterCard item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  singleFilter: {
    flex: 1,
  },
});
