import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { Text, Card, Button, ActivityIndicator, Divider, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock favorite recipes data
const MOCK_FAVORITES = [
  {
    id: '1',
    title: 'Fırında Tavuk Göğsü',
    description: 'Baharatlarla marine edilmiş, fırında pişirilmiş sulu tavuk göğsü',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    prepTime: '15 dk',
    cookTime: '30 dk',
  },
  {
    id: '2',
    title: 'Mercimek Çorbası',
    description: 'Geleneksel Türk mutfağından, baharatlı kırmızı mercimek çorbası',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    prepTime: '10 dk',
    cookTime: '25 dk',
  },
  {
    id: '3',
    title: 'Karnabahar Pizzası',
    description: 'Düşük karbonhidratlı, glutensiz karnabahar tabanlı pizza',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    prepTime: '20 dk',
    cookTime: '15 dk',
  },
];

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<typeof MOCK_FAVORITES>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      // In a real app, this would fetch from a database
      // For demo, we'll use AsyncStorage with mock data
      const storedFavorites = await AsyncStorage.getItem('favorites');
      
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        // Use mock data for demo
        setFavorites(MOCK_FAVORITES);
        await AsyncStorage.setItem('favorites', JSON.stringify(MOCK_FAVORITES));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (id: string) => {
    try {
      const updatedFavorites = favorites.filter(recipe => recipe.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const handleRecipePress = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#f4511e" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Favorilerim</Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.recipeCard} onPress={() => handleRecipePress(item.id)}>
              <View style={styles.cardContent}>
                <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
                <View style={styles.recipeInfo}>
                  <Text variant="titleMedium" style={styles.recipeTitle}>{item.title}</Text>
                  <Text variant="bodySmall" numberOfLines={2} style={styles.recipeDescription}>
                    {item.description}
                  </Text>
                  <Text variant="bodySmall" style={styles.recipeTime}>
                    ⏱️ {item.prepTime} + {item.cookTime}
                  </Text>
                </View>
                <IconButton
                  icon="heart-off"
                  size={24}
                  iconColor="#f4511e"
                  onPress={() => removeFromFavorites(item.id)}
                  style={styles.removeButton}
                />
              </View>
            </Card>
          )}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../assets/empty-favorites.png')}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text variant="titleMedium" style={styles.emptyText}>
            Henüz favori tarifiniz yok
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            Beğendiğiniz tarifleri favorilere ekleyerek burada görüntüleyebilirsiniz
          </Text>
          <Button
            mode="contained"
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  listContent: {
    padding: 16,
  },
  recipeCard: {
    marginBottom: 8,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeDescription: {
    color: '#666',
    marginBottom: 4,
  },
  recipeTime: {
    color: '#666',
  },
  removeButton: {
    margin: 0,
  },
  divider: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyText: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#f4511e',
  },
});