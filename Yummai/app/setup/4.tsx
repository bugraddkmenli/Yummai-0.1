import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, Button, RadioButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

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

export default function AccountSetupScreen4() {
  const router = useRouter();
  const [selectedDiet, setSelectedDiet] = useState('none');

  const handleNext = () => {
    // Save selection to global state or storage here
    router.push('/setup/5');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Diyet Tercihiniz</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Size en uygun tarifleri önerebilmemiz için diyet tercihinizi seçin.
        </Text>
      </View>

      <Surface style={styles.section} elevation={1}>
        <RadioButton.Group onValueChange={value => setSelectedDiet(value)} value={selectedDiet}>
          {DIET_PREFERENCES.map(diet => (
            <View key={diet.id} style={styles.radioItem}>
              <RadioButton.Android value={diet.id} color="#f4511e" />
              <Text variant="bodyLarge" style={styles.radioLabel}>{diet.name}</Text>
            </View>
          ))}
        </RadioButton.Group>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleNext}
          style={styles.button}
        >
          İleri
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
    marginBottom: 8,
    color: '#f4511e',
  },
  subtitle: {
    color: '#666',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioLabel: {
    marginLeft: 8,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 8,
  },
});