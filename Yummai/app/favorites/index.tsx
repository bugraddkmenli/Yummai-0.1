import { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Text, Card, Button, Chip, Searchbar, SegmentedButtons, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

type Recipe = {
  id: string;
  name: string;
  image: string;
  description: string;
  preparationTime: number;
  difficulty: string;
  cuisineType: string;
  isFavorite: boolean;
};

export default function FavoritesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('favorites');
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      name: 'Beef Wellington',
      image: 'https://via.placeholder.com/150',
      description: 'Klasik bir İngiliz yemeği olan Beef Wellington, dana filetosu etrafına mantar karışımı ve milföy hamuru sarılarak hazırlanır.',
      preparationTime: 90,
      difficulty: 'Orta',
      cuisineType: 'İngiliz',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Risotto ai Funghi',
      image: 'https://via.placeholder.com/150',
      description: 'Mantarlı İtalyan pilav yemeği, parmesan peyniri ile servis edilir.',
      preparationTime: 45,
      difficulty: 'Orta',
      cuisineType: 'İtalyan',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Coq au Vin',
      image: 'https://via.placeholder.com/150',
      description: 'Şarap, mantar ve sarımsakla pişirilen Fransız tavuk yahnisi.',
      preparationTime: 120,
      difficulty: 'Zor',
      cuisineType: 'Fransız',
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Sushi Rolls',
      image: 'https://via.placeholder.com/150',
      description: 'Sirkelenmiş pirinç ve çeşitli iç malzemelerle hazırlanan Japon yemeği.',
      preparationTime: 60,
      difficulty: 'Zor',
      cuisineType: 'Japon',
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Paella',
      image: 'https://via.placeholder.com/150',
      description: 'Deniz ürünleri, et ve sebzelerle hazırlanan İspanyol pilav yemeği.',
      preparationTime: 75,
      difficulty: 'Orta',
      cuisineType: 'İspanyol',
      isFavorite: false,
    },
  ]);

  const filteredRecipes = recipes.filter(recipe => {
    // Filter by search query
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.cuisineType.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by active tab
    const matchesTab = activeTab === 'favorites' ? recipe.isFavorite : !recipe.isFavorite;
    
    return matchesSearch && matchesTab;
  });

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ));
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Title 
        title={item.name} 
        right={(props) => (
          <IconButton 
            {...props} 
            icon={item.isFavorite ? 'heart' : 'heart-outline'} 
            iconColor={item.isFavorite ? '#f4511e' : undefined}
            onPress={() => toggleFavorite(item.id)} 
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.tagsContainer}>
          <Chip icon="clock-outline" style={styles.chip}>{item.preparationTime} dk</Chip>
          <Chip icon="chef-hat" style={styles.chip}>{item.difficulty}</Chip>
          <Chip icon="food-variant" style={styles.chip}>{item.cuisineType}</Chip>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => console.log(`View recipe ${item.id}`)}>
          Tarifi Görüntüle
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Tariflerim</Text>
      </View>

      <Searchbar
        placeholder="Tarif ara..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: 'favorites', label: 'Favoriler', icon: 'heart' },
          { value: 'saved', label: 'Kaydedilenler', icon: 'bookmark' },
        ]}
        style={styles.segmentedButtons}
      />

      {filteredRecipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.recipeList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text variant="titleMedium" style={styles.emptyText}>
            {searchQuery ? 'Aramanızla eşleşen tarif bulunamadı.' : 
              activeTab === 'favorites' ? 'Henüz favori tarifiniz yok.' : 'Henüz kaydedilmiş tarifiniz yok.'}
          </Text>
          <Button 
            mode="contained" 
            icon="magnify" 
            onPress={() => router.push('/')}
            style={styles.exploreButton}
          >
            Tarifleri Keşfet
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  searchBar: {
    margin: 16,
    marginBottom: 8,
  },
  segmentedButtons: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  recipeList: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  exploreButton: {
    backgroundColor: '#f4511e',
  },
});