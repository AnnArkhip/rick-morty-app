import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Character } from './DetailsCharacter';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { StackParams } from './MainStack';
type Props = {
  item: Character;
};
type NavigationProp = NativeStackNavigationProp<StackParams, 'Home'>;

export default function CharacterCard({ item }: Props) {
  const { darkTheme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { character: item })}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: darkTheme ? '#1e1e1e' : 'white' },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={[{ color: darkTheme ? 'white' : '#333333' }]}>
            {item.name}
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.detailText}>{item.status}</Text>
            <Text style={styles.detailText}>{item.species}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
  },
  detailText: {
    color: '#ccc',
    fontSize: 14,
  },
});
