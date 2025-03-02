import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text, Button, List, Surface, Divider, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { analyzeImage } from '../../../utils/deepseek';

export default function CameraResultScreen() {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function performAnalysis() {
      try {
        setLoading(true);
        const result = await analyzeImage(imageUri as string);
        setAnalysisResult(result);
      } catch (err) {
        setError('Failed to analyze image. Please try again.');
        console.error('Analysis error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (imageUri) {
      performAnalysis();
    }
  }, [imageUri]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>Analyzing your food...</Text>
      </View>
    );
  }

  if (error || !analysisResult) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Something went wrong'}</Text>
        <Button 
          mode="contained" 
          onPress={() => router.back()}
          style={styles.button}
        >
          Try Again
        </Button>
      </View>
    );
  }

  // Remove the duplicate analysisResult declaration and use the one from useState
  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.imageSurface} elevation={2}>
        <View style={styles.imageContainer}>
          {imageUri && <Image source={{ uri: imageUri as string }} style={styles.image} />}
        </View>
      </Surface>
      
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {analysisResult.dishName}
        </Text>
        
        <Surface style={styles.sectionSurface} elevation={1}>
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Ingredients
            </Text>
            <Divider style={styles.divider} />
            
            {analysisResult.ingredients.map((ingredient, index) => (
              <List.Item
                key={index}
                title={`${ingredient.name}`}
                description={ingredient.notes ? ingredient.notes : undefined}
                right={() => (
                  <Text style={styles.quantityText}>
                    {`${ingredient.quantity} ${ingredient.unit}`}
                  </Text>
                )}
              />
            ))}
          </View>
        </Surface>
        
        <Surface style={styles.sectionSurface} elevation={1}>
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Nutritional Information
            </Text>
            <Divider style={styles.divider} />
            
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text variant="bodyLarge" style={styles.nutritionValue}>
                  {analysisResult.nutritionalInfo.calories}
                </Text>
                <Text variant="bodySmall">Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text variant="bodyLarge" style={styles.nutritionValue}>
                  {analysisResult.nutritionalInfo.protein}g
                </Text>
                <Text variant="bodySmall">Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text variant="bodyLarge" style={styles.nutritionValue}>
                  {analysisResult.nutritionalInfo.carbs}g
                </Text>
                <Text variant="bodySmall">Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text variant="bodyLarge" style={styles.nutritionValue}>
                  {analysisResult.nutritionalInfo.fat}g
                </Text>
                <Text variant="bodySmall">Fat</Text>
              </View>
            </View>
          </View>
        </Surface>
        
        <Surface style={styles.sectionSurface} elevation={1}>
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Cost Comparison
            </Text>
            <Divider style={styles.divider} />
            
            <View style={styles.costContainer}>
              <View style={styles.costItem}>
                <Text variant="bodyLarge" style={styles.costValue}>
                  ${analysisResult.estimatedCost.restaurant}
                </Text>
                <Text variant="bodySmall">Restaurant</Text>
              </View>
              <View style={styles.costItem}>
                <Text variant="bodyLarge" style={styles.costValue}>
                  ${analysisResult.estimatedCost.homemade}
                </Text>
                <Text variant="bodySmall">Homemade</Text>
              </View>
              <View style={styles.costItem}>
                <Text variant="bodyLarge" style={[styles.costValue, styles.savingsValue]}>
                  ${analysisResult.estimatedCost.restaurant - analysisResult.estimatedCost.homemade}
                </Text>
                <Text variant="bodySmall">Savings</Text>
              </View>
            </View>
          </View>
        </Surface>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/recipe/${analysisResult.dishName}`)}
          style={styles.button}
        >
          View Full Recipe
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          style={styles.secondaryButton}
        >
          Take Another Photo
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
  imageSurface: {
    width: '100%',
    marginBottom: 0,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 16,
  },
  sectionSurface: {
    marginBottom: 16,
  },
  section: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    padding: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
  },
  quantityText: {
    alignSelf: 'center',
    color: '#666',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  nutritionItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  nutritionValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  costContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  costItem: {
    flex: 1,
    alignItems: 'center',
  },
  costValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  savingsValue: {
    color: '#4CAF50',
  },
  buttonContainer: {
    padding: 16,
    gap: 8,
  },
  button: {
    backgroundColor: '#f4511e',
  },
  secondaryButton: {
    borderColor: '#f4511e',
  },
});