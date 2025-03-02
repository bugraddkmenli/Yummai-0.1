import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button, Checkbox, Chip, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function DietaryPreferencesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Dietary preferences state
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  
  // Allergies state
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState('');
  
  // Cuisine preferences state
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([]);
  const availableCuisines = [
    'Türk', 'İtalyan', 'Fransız', 'Japon', 'Çin', 'Hint', 'Meksika', 'Akdeniz', 'Orta Doğu', 'Amerikan'
  ];
  
  // Favorite ingredients state
  const [favoriteIngredients, setFavoriteIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');

  const addAllergy = () => {
    if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter(item => item !== allergy));
  };

  const addIngredient = () => {
    if (ingredientInput.trim() && !favoriteIngredients.includes(ingredientInput.trim())) {
      setFavoriteIngredients([...favoriteIngredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setFavoriteIngredients(favoriteIngredients.filter(item => item !== ingredient));
  };

  const toggleCuisine = (cuisine: string) => {
    if (cuisinePreferences.includes(cuisine)) {
      setCuisinePreferences(cuisinePreferences.filter(item => item !== cuisine));
    } else {
      setCuisinePreferences([...cuisinePreferences, cuisine]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Create dietary preferences object
    const dietaryPreferences = {
      isVegan,
      isVegetarian,
      isGlutenFree,
      isLactoseFree,
      allergies,
      cuisinePreferences,
      favoriteIngredients
    };
    
    // TODO: Save to Supabase
    console.log('Saving dietary preferences:', dietaryPreferences);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Beslenme Tercihleri</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Size özel tarifler sunabilmemiz için beslenme tercihlerinizi belirleyin.
        </Text>
      </View>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Diyet Tercihleri</Text>
        
        <View style={styles.checkboxRow}>
          <Checkbox
            status={isVegan ? 'checked' : 'unchecked'}
            onPress={() => setIsVegan(!isVegan)}
          />
          <Text style={styles.checkboxLabel}>Vegan</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <Checkbox
            status={isVegetarian ? 'checked' : 'unchecked'}
            onPress={() => setIsVegetarian(!isVegetarian)}
          />
          <Text style={styles.checkboxLabel}>Vejetaryen</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <Checkbox
            status={isGlutenFree ? 'checked' : 'unchecked'}
            onPress={() => setIsGlutenFree(!isGlutenFree)}
          />
          <Text style={styles.checkboxLabel}>Glutensiz</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <Checkbox
            status={isLactoseFree ? 'checked' : 'unchecked'}
            onPress={() => setIsLactoseFree(!isLactoseFree)}
          />
          <Text style={styles.checkboxLabel}>Laktozsuz</Text>
        </View>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Alerjileriniz</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            label="Alerji ekle"
            value={allergyInput}
            onChangeText={setAllergyInput}
            style={styles.input}
            right={<TextInput.Icon icon="plus" onPress={addAllergy} />}
            onSubmitEditing={addAllergy}
          />
        </View>
        
        <View style={styles.chipContainer}>
          {allergies.map((allergy, index) => (
            <Chip 
              key={index} 
              onClose={() => removeAllergy(allergy)}
              style={styles.chip}
            >
              {allergy}
            </Chip>
          ))}
        </View>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Mutfak Tercihleri</Text>
        
        <View style={styles.chipContainer}>
          {availableCuisines.map((cuisine, index) => (
            <Chip 
              key={index} 
              selected={cuisinePreferences.includes(cuisine)}
              onPress={() => toggleCuisine(cuisine)}
              style={styles.chip}
              showSelectedOverlay
            >
              {cuisine}
            </Chip>
          ))}
        </View>
      </Surface>

      <Surface style={styles.section} elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Favori Malzemeleriniz</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            label="Malzeme ekle"
            value={ingredientInput}
            onChangeText={setIngredientInput}
            style={styles.input}
            right={<TextInput.Icon icon="plus" onPress={addIngredient} />}
            onSubmitEditing={addIngredient}
          />
        </View>
        
        <View style={styles.chipContainer}>
          {favoriteIngredients.map((ingredient, index) => (
            <Chip 
              key={index} 
              onClose={() => removeIngredient(ingredient)}
              style={styles.chip}
            >
              {ingredient}
            </Chip>
          ))}
        </View>
      </Surface>

      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
        disabled={loading}
        style={styles.saveButton}
      >
        Kaydet ve Devam Et
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    margin: 4,
  },
  saveButton: {
    marginVertical: 24,
    backgroundColor: '#f4511e',
    paddingVertical: 8,
  },
});