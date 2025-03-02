import { DEEPSEEK_API_KEY } from '@env';

interface AnalysisResult {
  dishName: string;
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: string;
    notes: string;
  }>;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  estimatedCost: {
    restaurant: number;
    homemade: number;
  };
}

export async function analyzeImage(imageUri: string): Promise<AnalysisResult> {
  try {
    // Convert image to base64 if needed
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'food.jpg',
    });

    const response = await fetch('https://api.deepseek.com/v1/vision/analyze', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    const data = await response.json();
    
    // Transform the API response to match our interface
    return {
      dishName: data.name,
      ingredients: data.ingredients.map(ing => ({
        name: ing.name,
        quantity: ing.amount,
        unit: ing.unit,
        notes: ing.notes || '',
      })),
      nutritionalInfo: {
        calories: data.nutrition.calories,
        protein: data.nutrition.protein,
        carbs: data.nutrition.carbohydrates,
        fat: data.nutrition.fat,
      },
      estimatedCost: {
        restaurant: data.cost.restaurant,
        homemade: data.cost.homemade,
      },
    };
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw error;
  }
}