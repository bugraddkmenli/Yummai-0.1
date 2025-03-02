import { useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Button, Chip, Surface, List, IconButton } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);

  // Example recipe data - replace with API call
  const recipe = {
    title: 'Köfte',
    image: 'https://picsum.photos/700',
    prepTime: '20 dk',
    cookTime: '15 dk',
    servings: 4,
    difficulty: 'Orta',
    calories: 250,
    ingredients: [
      '500g kıyma',
      '1 soğan',
      '2 diş sarımsak',
      'Karabiber',
      'Tuz',
      'Kimyon',
    ],
    steps: [
      'Kıymayı geniş bir kaba alın.',
      'Soğanı ve sarımsağı ince ince doğrayın.',
      'Tüm malzemeleri karıştırın.',
      'Köfte şekli verin.',
      'Izgara veya tavada pişirin.',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.imageContainer} elevation={2}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <IconButton
          icon={favorite ? 'heart' : 'heart-outline'}
          size={24}
          iconColor={favorite ? '#f4511e' : '#fff'}
          style={styles.favoriteButton}
          onPress={() => setFavorite(!favorite)}
        />
      </Surface>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>{recipe.title}</Text>
        
        <View style={styles.infoContainer}>
          <Chip icon="clock-outline" style={styles.chip}>
            Hazırlık: {recipe.prepTime}
          </Chip>
          <Chip icon="pot-steam" style={styles.chip}>
            Pişirme: {recipe.cookTime}
          </Chip>
          <Chip icon="account-group" style={styles.chip}>
            {recipe.servings} Kişilik
          </Chip>
          <Chip icon="chef-hat" style={styles.chip}>
            {recipe.difficulty}
          </Chip>
          <Chip icon="fire" style={styles.chip}>
            {recipe.calories} kcal
          </Chip>
        </View>

        <List.Section>
          <List.Subheader style={styles.sectionTitle}>Malzemeler</List.Subheader>
          {recipe.ingredients.map((ingredient, index) => (
            <List.Item
              key={index}
              title={ingredient}
              left={() => <List.Icon icon="circle-small" />}
            />
          ))}
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.sectionTitle}>Hazırlanışı</List.Subheader>
          {recipe.steps.map((step, index) => (
            <List.Item
              key={index}
              title={step}
              left={() => (
                <View style={styles.stepNumber}>
                  <Text>{index + 1}</Text>
                </View>
              )}
              titleNumberOfLines={3}
            />
          ))}
        </List.Section>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => {}} 
          style={styles.button}
          icon="play"
        >
          Tarifi Başlat
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
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f4511e',
  },
});