import { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Searchbar, Chip, Card, ActivityIndicator, Surface } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { debounce } from 'lodash';

const FILTERS = [
  { id: 'all', name: 'Tümü' },
  { id: 'breakfast', name: 'Kahvaltı' },
  { id: 'lunch', name: 'Öğle' },
  { id: 'dinner', name: 'Akşam' },
  { id: 'dessert', name: 'Tatlı' },
  { id: 'vegetarian', name: 'Vejetaryen' },
  { id: 'vegan', name: 'Vegan' },
];

// Move interface to top of file, after imports
interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  prepTime: string;
  difficulty: string;
  category: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(q?.toString() || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recipe[]>([]);
  const handleSearch = useCallback(async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          {
            id: '1',
            title: 'Fırında Tavuk Göğsü',
            imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            prepTime: '15 dk',
            difficulty: 'Kolay',
            category: 'dinner'
          },
          {
            id: '2',
            title: 'Mercimek Çorbası',
            imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            prepTime: '25 dk',
            difficulty: 'Kolay',
            category: 'lunch'
          },
          {
            id: '3',
            title: 'Karnabahar Pizzası',
            imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            prepTime: '35 dk',
            difficulty: 'Orta',
            category: 'vegetarian'
          },
          {
            id: '4',
            title: 'Çikolatalı Brownie',
            imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            prepTime: '40 dk',
            difficulty: 'Orta',
            category: 'dessert'
          }
        ];
        
        const filteredResults = mockResults.filter(recipe => {
          const matchesCategory = selectedFilter === 'all' || recipe.category === selectedFilter;
          const matchesSearch = !searchQuery || 
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });
        
        setResults(filteredResults);
        setLoading(false);
      }, 300);
    }, [searchQuery, selectedFilter]);
  
  // Fix the debounce implementation
  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch]
  );
  
  useEffect(() => {
    if (q) {
      debouncedSearch();
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [q, debouncedSearch]);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch();
  };

  useEffect(() => {
    debouncedSearch();
  }, [selectedFilter]);
  return (
    <View style={styles.container}>
      <Surface style={styles.searchContainer} elevation={2}>
        <Searchbar
          placeholder="Tarif ara..."
          onChangeText={handleSearchQueryChange}
          value={searchQuery}
          style={styles.searchbar}
        />
      </Surface>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {FILTERS.map(filter => (
          <Chip
            key={filter.id}
            selected={selectedFilter === filter.id}
            onPress={() => setSelectedFilter(filter.id)}
            style={styles.filterChip}
            selectedColor="#f4511e"
          >
            {filter.name}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f4511e" />
          </View>
        ) : results.length > 0 ? (
          results.map((item) => (
            <Card 
              key={item.id} 
              style={styles.recipeCard}
              mode="elevated"
              onPress={() => router.push(`/recipe/${item.id}`)}
            >
              <Card.Cover 
                source={{ uri: item.imageUrl }} 
                style={styles.recipeImage}
              />
              <Card.Title
                title={item.title}
                subtitle={`${item.prepTime} • ${item.difficulty}`}
                titleStyle={styles.recipeTitle}
                titleVariant="titleMedium"
              />
            </Card>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">Sonuç bulunamadı.</Text>
          </View>
        )}
      </ScrollView>
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
  filtersContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  filterChip: {
    marginHorizontal: 4,
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
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
});