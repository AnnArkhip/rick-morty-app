import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from './ThemeContext';

type StatusType = '' | 'alive' | 'dead' | 'unknown' | string;

type StatusProps = {
  selected: StatusType;
  onChange: (value: StatusType) => void;
};

export default function StatusFilter({ selected, onChange }: StatusProps) {
  const { darkTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkTheme ? '#333333' : 'white' },
      ]}
    >
      <Text style={[styles.text, { color: darkTheme ? 'white' : '#333333' }]}>
        Status:
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selected}
          onValueChange={(value) => onChange(value)}
          style={styles.picker}
          itemStyle={[{ color: darkTheme ? 'white' : '#333333' }]}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Alive" value="alive" />
          <Picker.Item label="Dead" value="dead" />
          <Picker.Item label="unknown" value="unknown" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  pickerContainer: {
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
  text: {
    fontSize: 17,
    marginBottom: 4,
  },
});
