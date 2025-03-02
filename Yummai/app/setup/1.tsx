import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetupCountryFoodScreen() {
  const router = useRouter();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  
  const cuisines = [
    'Türk', 'İtalyan', 'Fransız', 'Çin', 'Japon', 
    'Hint', 'Meksika', 'Tayland', 'Yunan', 'Lübnan',
    'İspanyol', 'Kore', 'Vietnam', 'Amerika', 'Brezilya'
  ];

  const toggleCuisine = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(item => item !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleNext = async () => {
    // Save selected cuisines
    await AsyncStorage.setItem('preferredCountryCuisines', JSON.stringify(selectedCuisines));
    router.push('/setup/2');
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineSmall" style={styles.title}>Tercih Ettiğiniz Mutfaklar</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Hangi ülke mutfaklarını seviyorsunuz? Birden fazla seçebilirsiniz.
        </Text>
      </Surface>

      <ScrollView style={styles.content} contentContainerStyle={styles.chipContainer}>
        {cuisines.map((cuisine) => (
          <Chip
            key={cuisine}
            selected={selectedCuisines.includes(cuisine)}
            onPress={() => toggleCuisine(cuisine)}
            style={styles.chip}
            selectedColor="#fff"
            showSelectedOverlay
            mode="outlined"
            selectedBackgroundColor="#f4511e"
          >
            {cuisine}
          </Chip>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={handleNext}
          style={styles.button}
          disabled={selectedCuisines.length === 0}
        >
          İleri
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f4511e',
  },
  subtitle: {
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 16,
  },
  chip: {
    margin: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: '#f4511e',
  },
});