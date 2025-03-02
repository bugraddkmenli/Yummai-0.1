import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Chip, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetupCuisineTypesScreen() {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const cuisineTypes = [
    'Ev Yemekleri', 'Fast Food', 'Sokak Lezzetleri', 'Fine Dining', 
    'Deniz Ürünleri', 'Izgara', 'Fırın', 'Tatlılar', 'Kahvaltı',
    'Çorbalar', 'Salatalar', 'Makarnalar', 'Pizzalar', 'Burgerler',
    'Vejetaryen', 'Vegan', 'Glutensiz', 'Düşük Kalorili'
  ];

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleNext = async () => {
    // Save selected cuisine types
    await AsyncStorage.setItem('preferredCuisineTypes', JSON.stringify(selectedTypes));
    router.push('/setup/3');
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineSmall" style={styles.title}>Tercih Ettiğiniz Yemek Türleri</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Hangi tür yemekleri seviyorsunuz? Birden fazla seçebilirsiniz.
        </Text>
      </Surface>

      <ScrollView style={styles.content} contentContainerStyle={styles.chipContainer}>
        {cuisineTypes.map((type) => (
          <Chip
            key={type}
            selected={selectedTypes.includes(type)}
            onPress={() => toggleType(type)}
            style={styles.chip}
            selectedColor="#fff"
            showSelectedOverlay
            mode="outlined"
            selectedBackgroundColor="#f4511e"
          >
            {type}
          </Chip>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={handleNext}
          style={styles.button}
          disabled={selectedTypes.length === 0}
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