import { useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, Card, Searchbar, Chip, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const CATEGORIES = [
  { id: 'popular', name: 'Popüler' },
  { id: 'trending', name: 'Trend' },
  { id: 'new', name: 'Yeni' },
  { id: 'recommended', name: 'Önerilen' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch new data here
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleSearch = () => {
    router.push({
      pathname: '/search',
      params: { q: searchQuery }
    });
  };
  
  return (
    <View style={styles.container}>
      <Surface style={styles.searchContainer} elevation={2}>
        <Searchbar
          placeholder="Tarif ara..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchbar}
        />
      </Surface>

      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map(category => (
            <Chip
              key={category.id}
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={styles.categoryChip}
              selectedColor="#f4511e"
            >
              {category.name}
            </Chip>
          ))}
        </ScrollView>
        
        <View style={styles.recipesContainer}>
          {/* Example Recipe Cards - Replace with real data */}
          {[1, 2, 3].map((item) => (
            <Card 
              key={item} 
              style={styles.recipeCard}
              onPress={() => router.push(`/recipe/${item}`)}
            >
              <Card.Cover 
                source={{ uri: 'https://picsum.photos/700' }} 
                style={styles.recipeImage}
              />
              <Card.Title
                title="Örnek Tarif"
                subtitle="30 dakika • Kolay"
                titleStyle={styles.recipeTitle}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => {/* navigation logic */}}
        >
          <MaterialIcons name="home" size={24} color="#f4511e" />
          <Text style={styles.navText}>Ana Sayfa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => router.push('/ai-chat')}
        >
          <MaterialIcons name="chat" size={24} color="#f4511e" />
          <Text style={styles.navText}>AI Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => {/* navigation logic */}}
        >
          <MaterialIcons name="favorite" size={24} color="#f4511e" />
          <Text style={styles.navText}>Favoriler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f5f5f5',
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  categoryChip: {
    marginHorizontal: 4,
  },
  recipesContainer: {
    padding: 16,
  },
  recipeCard: {
    marginBottom: 16,
    elevation: 2,
  },
  recipeImage: {
    height: 200,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});