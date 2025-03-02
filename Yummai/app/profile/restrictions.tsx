import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button, Chip, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COMMON_ALLERGENS = [
  { id: 'gluten', name: 'Gluten' },
  { id: 'dairy', name: 'Süt Ürünleri' },
  { id: 'eggs', name: 'Yumurta' },
  { id: 'peanuts', name: 'Yer Fıstığı' },
  { id: 'tree_nuts', name: 'Kuruyemiş' },
  { id: 'soy', name: 'Soya' },
  { id: 'fish', name: 'Balık' },
  { id: 'shellfish', name: 'Kabuklu Deniz Ürünleri' },
  { id: 'sesame', name: 'Susam' },
  { id: 'mustard', name: 'Hardal' },
];

const DISLIKED_INGREDIENTS = [
  { id: 'onion', name: 'Soğan' },
  { id: 'garlic', name: 'Sarımsak' },
  { id: 'mushroom', name: 'Mantar' },
  { id: 'bell_pepper', name: 'Biber' },
  { id: 'eggplant', name: 'Patlıcan' },
  { id: 'tomato', name: 'Domates' },
  { id: 'cilantro', name: 'Kişniş' },
  { id: 'olives', name: 'Zeytin' },
  { id: 'spicy', name: 'Acı' },
  { id: 'seafood', name: 'Deniz Ürünleri' },
  { id: 'lamb', name: 'Kuzu Eti' },
  { id: 'beef', name: 'Sığır Eti' },
  { id: 'pork', name: 'Domuz Eti' },
];

export default function RestrictionsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDislikes, setSelectedDislikes] = useState<string[]>([]);

  useEffect(() => {
    loadRestrictions();
  }, []);

  const loadRestrictions = async () => {
    try {
      const restrictions = await AsyncStorage.getItem('dietaryRestrictions');
      if (restrictions) {
        const data = JSON.parse(restrictions);
        setSelectedAllergens(data.allergens || []);
        setSelectedDislikes(data.dislikes || []);
      }
    } catch (error) {
      console.error('Error loading restrictions:', error);
    }
  };

  const handleAllergenToggle = (id: string) => {
    setSelectedAllergens(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleDislikeToggle = (id: string) => {
    setSelectedDislikes(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredIngredients = DISLIKED_INGREDIENTS.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      const restrictions = {
        allergens: selectedAllergens,
        dislikes: selectedDislikes
      };
      
      await AsyncStorage.setItem('dietaryRestrictions', JSON.stringify(restrictions));
      router.back();
    } catch (error) {
      console.error('Error saving restrictions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Alerjiler ve Kısıtlamalar</Text>
      </View>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Alerjileriniz</Text>
        <Text variant="bodyMedium" style={styles.sectionDescription}>
          Alerjiniz olan gıdaları seçin. Bu gıdalar içeren tarifler size önerilmeyecektir.
        </Text>
        <View style={styles.chipContainer}>
          {COMMON_ALLERGENS.map(allergen => (
            <Chip
              key={allergen.id}
              selected={selectedAllergens.includes(allergen.id)}
              onPress={() => handleAllergenToggle(allergen.id)}
              style={styles.chip}
              selectedColor="#f4511e"
              showSelectedOverlay
            >
              {allergen.name}
            </Chip>
          ))}
        </View>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Sevmediğiniz Malzemeler</Text>
        <Text variant="bodyMedium" style={styles.sectionDescription}>
          Sevmediğiniz malzemeleri seçin. Bu malzemeleri içeren tarifler size daha az önerilecektir.
        </Text>
        
        <Searchbar
          placeholder="Malzeme ara..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.chipContainer}>
          {filteredIngredients.map(ingredient => (
            <Chip
              key={ingredient.id}
              selected={selectedDislikes.includes(ingredient.id)}
              onPress={() => handleDislikeToggle(ingredient.id)}
              style={styles.chip}
              selectedColor="#f4511e"
              showSelectedOverlay
            >
              {ingredient.name}
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
    marginBottom: 8,
    fontWeight: 'bold',
  },
  sectionDescription: {
    marginBottom: 16,
    color: '#666',
  },
  searchbar: {
    marginBottom: 16,
    backgroundColor: '#fff',
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