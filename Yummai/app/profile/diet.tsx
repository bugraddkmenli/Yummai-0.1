import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button, RadioButton, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DIET_PREFERENCES = [
  { id: 'none', name: 'Özel Diyet Yok' },
  { id: 'vegetarian', name: 'Vejetaryen' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'pescatarian', name: 'Pesketaryen' },
  { id: 'keto', name: 'Ketojenik' },
  { id: 'paleo', name: 'Paleo' },
  { id: 'gluten_free', name: 'Glutensiz' },
  { id: 'dairy_free', name: 'Süt Ürünsüz' },
  { id: 'low_carb', name: 'Düşük Karbonhidrat' },
];

const CUISINE_TYPES = [
  { id: 'breakfast', name: 'Kahvaltı' },
  { id: 'lunch', name: 'Öğle Yemeği' },
  { id: 'dinner', name: 'Akşam Yemeği' },
  { id: 'dessert', name: 'Tatlı' },
  { id: 'snack', name: 'Atıştırmalık' },
  { id: 'salad', name: 'Salata' },
  { id: 'soup', name: 'Çorba' },
  { id: 'fastfood', name: 'Fast Food' },
  { id: 'healthy', name: 'Sağlıklı' },
  { id: 'grill', name: 'Izgara' },
  { id: 'seafood', name: 'Deniz Ürünleri' },
  { id: 'vegetarian', name: 'Vejetaryen' },
];

export default function DietPreferencesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState('none');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const dietPrefs = await AsyncStorage.getItem('dietPreferences');
      if (dietPrefs) {
        const prefs = JSON.parse(dietPrefs);
        setSelectedDiet(prefs.diet || 'none');
        setSelectedCuisines(prefs.cuisines || []);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const handleCuisineToggle = (id: string) => {
    setSelectedCuisines(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const preferences = {
        diet: selectedDiet,
        cuisines: selectedCuisines
      };
      
      await AsyncStorage.setItem('dietPreferences', JSON.stringify(preferences));
      router.back();
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Diyet Tercihleri</Text>
      </View>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Diyet Tipiniz</Text>
        <RadioButton.Group onValueChange={value => setSelectedDiet(value)} value={selectedDiet}>
          {DIET_PREFERENCES.map(diet => (
            <View key={diet.id} style={styles.radioItem}>
              <RadioButton.Android value={diet.id} color="#f4511e" />
              <Text variant="bodyLarge" style={styles.radioLabel}>{diet.name}</Text>
            </View>
          ))}
        </RadioButton.Group>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Tercih Ettiğiniz Yemek Türleri</Text>
        <View style={styles.chipContainer}>
          {CUISINE_TYPES.map(cuisine => (
            <Chip
              key={cuisine.id}
              selected={selectedCuisines.includes(cuisine.id)}
              onPress={() => handleCuisineToggle(cuisine.id)}
              style={styles.chip}
              selectedColor="#f4511e"
              showSelectedOverlay
            >
              {cuisine.name}
            </Chip>
          ))}
        </View>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          İptal
        </Button>
        <Button 
          mode="contained" 
          onPress={handleSave}
          loading={loading}
          disabled={loading}
          style={styles.saveButton}
        >
          Kaydet
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioLabel: {
    marginLeft: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    margin: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#f4511e',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#f4511e',
  },
});