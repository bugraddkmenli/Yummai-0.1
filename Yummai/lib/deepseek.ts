import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

// Define types for the DeepSeek API responses

// Nutritional information interface
export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar?: number;
  sodium?: number;
  fiber?: number;
}

// Cost comparison interface
export interface CostComparison {
  restaurant: number;
  homemade: number;
  savings?: number;
}

// Ingredient interface with optional market prices
export interface RecognizedIngredient {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
  marketPrices?: {
    store: string;
    price: number;
  }[];
}

// Main food recognition response interface
export interface FoodRecognitionResponse {
  name: string;
  description: string;
  ingredients: RecognizedIngredient[];
  nutritionalInfo: NutritionalInfo;
  costComparison: CostComparison;
  preparationTime: number;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  steps: string[];
  similarRecipes: { id: string; name: string }[];
}

export interface ChatResponse {
  text: string;
  relatedRecipe?: {
    id: string;
    name: string;
  };
}

class DeepSeekService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    // Get API key from environment variables or Constants
    this.apiKey = process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY || Constants.expoConfig?.extra?.deepseekApiKey || '';
    this.apiUrl = 'https://api.deepseek.ai/v1';
    
    if (!this.apiKey) {
      console.warn('DeepSeek API key is not configured. Using mock data for development.');
    } else {
      console.log('DeepSeek API key configured successfully');
    }
  }

  /**
   * Analyze food image and return recipe information
   * @param imageUri URI of the image to analyze
   * @param userPreferences Optional user dietary preferences
   * @returns Promise with food recognition data
   */
  async analyzeFoodImage(imageUri: string, userPreferences?: {
    isVegan?: boolean;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
    isLactoseFree?: boolean;
    allergies?: string[];
    cuisinePreferences?: string[];
    favoriteIngredients?: string[];
  }): Promise<FoodRecognitionResponse> {
    try {
      console.log('Analyzing image:', imageUri);
      
      // For development purposes, always return mock data
      // In production, you would uncomment the API call below
      return this.getMockFoodData();
      
      /*
      // Convert image to base64 if needed
      let imageData: string | Blob;
      
      if (imageUri.startsWith('file://') || imageUri.startsWith('content://')) {
        // For local files, read and convert to base64
        try {
          const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          imageData = base64;
        } catch (error) {
          console.error('Error reading image file:', error);
          throw new Error('Failed to read image file');
        }
      } else {
        // For remote images or already processed images
        imageData = {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'food.jpg',
        } as any;
      }
      
      // Create form data for image upload
      const formData = new FormData();
      formData.append('image', imageData);
      
      // Add user dietary preferences if available
      const preferences = userPreferences || {
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: false,
        isLactoseFree: false,
        allergies: [],
        cuisinePreferences: [],
        favoriteIngredients: []
      };
      
      formData.append('preferences', JSON.stringify(preferences));

      // Make API request to DeepSeek
      const response = await fetch(`${this.apiUrl}/vision/analyze-food`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze food image');
      }

      const data = await response.json();
      return data;
      */
    } catch (error) {
      console.error('Error analyzing food image:', error);
      
      // For development/demo purposes, return mock data if API fails
      return this.getMockFoodData();
    }
  }

  /**
   * Send message to DeepSeek chatbot and get response
   * @param message User message
   * @param chatHistory Previous chat messages for context
   * @returns Promise with chat response
   */
  async sendChatMessage(message: string, chatHistory: Array<{text: string, isUser: boolean}>): Promise<ChatResponse> {
    try {
      // Get user dietary preferences if available
      // This would come from user profile or local storage in a real app
      const userPreferences = {
        isVegan: false,
        isVegetarian: false,
        isGlutenFree: false,
        isLactoseFree: false,
        allergies: [],
        cuisinePreferences: [],
        favoriteIngredients: []
      };

      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a helpful cooking assistant for the Yummai app. You help users with recipes, cooking techniques, and food-related questions. 
              User preferences: ${JSON.stringify(userPreferences)}. 
              Always provide helpful, accurate cooking advice. If you suggest a recipe, include it as structured data.`
            },
            ...chatHistory.map(msg => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get chat response');
      }

      const data = await response.json();
      
      // Parse the response to extract any recipe information
      const chatResponse: ChatResponse = {
        text: data.choices[0].message.content
      };
      
      // Check if the response contains a recipe recommendation
      // This is a simplified example - in reality, you might want to use a more robust method
      // to detect and extract recipe information
      if (data.choices[0].message.content.includes('recipe')) {
        // Extract recipe info if available
        // This is a placeholder - in a real implementation, you would parse the response
        // to extract structured recipe data if the AI included it
        chatResponse.relatedRecipe = {
          id: '101',
          name: 'Suggested Recipe'
        };
      }
      
      return chatResponse;
    } catch (error) {
      console.error('Error sending chat message:', error);
      
      // For development/demo purposes, return mock data if API fails
      return this.getMockChatResponse(message);
    }
  }

  /**
   * Get market prices for ingredients
   * @param ingredients List of ingredients to get prices for
   * @returns Promise with ingredients and their market prices
   */
  async getMarketPrices(ingredients: string[]): Promise<{
    ingredient: string;
    prices: { store: string; price: number }[];
  }[]> {
    try {
      // In a real implementation, this would call an API to get current market prices
      const response = await fetch(`${this.apiUrl}/market/prices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to get market prices');
      }

      const data = await response.json();
      return data.prices;
    } catch (error) {
      console.error('Error getting market prices:', error);
      
      // Return mock data for development/demo purposes
      return ingredients.map(ingredient => ({
        ingredient,
        prices: [
          { store: 'Market A', price: Math.round(Math.random() * 30) + 5 },
          { store: 'Market B', price: Math.round(Math.random() * 25) + 7 },
          { store: 'Pazar', price: Math.round(Math.random() * 20) + 3 },
        ]
      }));
    }
  }

  /**
   * Check if a recipe is suitable for user's dietary preferences
   * @param recipeIngredients List of ingredients in the recipe
   * @param userPreferences User's dietary preferences
   * @returns Object with suitability information and reasons
   */
  checkDietarySuitability(recipeIngredients: RecognizedIngredient[], userPreferences: {
    isVegan?: boolean;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
    isLactoseFree?: boolean;
    allergies?: string[];
  }): {
    suitable: boolean;
    reasons: string[];
    alternatives?: { original: string; alternative: string }[];
  } {
    const unsuitable: string[] = [];
    const alternatives: { original: string; alternative: string }[] = [];
    
    // Check each ingredient against user preferences
    recipeIngredients.forEach(ingredient => {
      // This is a simplified example - in a real app, you would have a database of ingredients
      // with their properties (vegan, contains gluten, etc.)
      
      // Example checks for common non-vegan ingredients
      if (userPreferences.isVegan) {
        const nonVeganIngredients = ['et', 'süt', 'yoğurt', 'peynir', 'tereyağı', 'krema', 'yumurta', 'bal'];
        if (nonVeganIngredients.some(item => ingredient.name.toLowerCase().includes(item))) {
          unsuitable.push(`${ingredient.name} vegan değildir`);
          
          // Suggest alternatives
          if (ingredient.name.toLowerCase().includes('süt')) {
            alternatives.push({ original: ingredient.name, alternative: 'Badem sütü veya hindistan cevizi sütü' });
          } else if (ingredient.name.toLowerCase().includes('et')) {
            alternatives.push({ original: ingredient.name, alternative: 'Tofu veya tempeh' });
          }
        }
      }
      
      // Check for vegetarian ingredients
      if (userPreferences.isVegetarian) {
        const nonVegetarianIngredients = ['et', 'tavuk', 'balık', 'jambon', 'sosis', 'sucuk', 'pastırma'];
        if (nonVegetarianIngredients.some(item => ingredient.name.toLowerCase().includes(item))) {
          unsuitable.push(`${ingredient.name} vejetaryen değildir`);
        }
      }
      
      // Check for gluten
      if (userPreferences.isGlutenFree) {
        const glutenIngredients = ['buğday', 'un', 'makarna', 'ekmek', 'bulgur', 'irmik'];
        if (glutenIngredients.some(item => ingredient.name.toLowerCase().includes(item))) {
          unsuitable.push(`${ingredient.name} gluten içerir`);
          
          // Suggest alternatives
          if (ingredient.name.toLowerCase().includes('un')) {
            alternatives.push({ original: ingredient.name, alternative: 'Glutensiz un veya badem unu' });
          } else if (ingredient.name.toLowerCase().includes('makarna')) {
            alternatives.push({ original: ingredient.name, alternative: 'Glutensiz makarna' });
          }
        }
      }
      
      // Check for lactose
      if (userPreferences.isLactoseFree) {
        const lactoseIngredients = ['süt', 'peynir', 'yoğurt', 'krema', 'tereyağı'];
        if (lactoseIngredients.some(item => ingredient.name.toLowerCase().includes(item))) {
          unsuitable.push(`${ingredient.name} laktoz içerir`);
          
          // Suggest alternatives
          if (ingredient.name.toLowerCase().includes('süt')) {
            alternatives.push({ original: ingredient.name, alternative: 'Laktozsuz süt veya badem sütü' });
          } else if (ingredient.name.toLowerCase().includes('peynir')) {
            alternatives.push({ original: ingredient.name, alternative: 'Laktozsuz peynir' });
          }
        }
      }
      
      // Check for allergies
      if (userPreferences.allergies && userPreferences.allergies.length > 0) {
        userPreferences.allergies.forEach(allergen => {
          if (ingredient.name.toLowerCase().includes(allergen.toLowerCase())) {
            unsuitable.push(`${ingredient.name} ${allergen} içerir (alerjen)`); 
          }
        });
      }
    });
    
    return {
      suitable: unsuitable.length === 0,
      reasons: unsuitable,
      alternatives: alternatives.length > 0 ? alternatives : undefined
    };
  }

  /**
   * Generate mock food data for development/demo purposes
   * @returns Mock food recognition data
   */
  private getMockFoodData(): FoodRecognitionResponse {
    // Create an array of different food options to randomize results
    const foodOptions = [
      {
        name: 'Köfte',
        description: 'Türk mutfağının klasik lezzeti, baharatlı dana kıyma köftesi.',
        ingredients: [
          { name: 'Dana kıyma', quantity: 500, unit: 'g', notes: 'Yağlı' },
          { name: 'Soğan', quantity: 1, unit: 'adet', notes: 'Rendelenmiş' },
          { name: 'Sarımsak', quantity: 2, unit: 'diş', notes: 'Ezilmiş' },
          { name: 'Maydanoz', quantity: 0.5, unit: 'demet', notes: 'İnce kıyılmış' },
          { name: 'Kimyon', quantity: 1, unit: 'tatlı kaşığı' },
          { name: 'Pul biber', quantity: 1, unit: 'çay kaşığı' },
          { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
          { name: 'Karabiber', quantity: 0.5, unit: 'çay kaşığı' }
        ],
        nutritionalInfo: {
          calories: 320,
          protein: 28,
          carbs: 5,
          fat: 22
        },
        costComparison: {
          restaurant: 120,
          homemade: 60
        },
        preparationTime: 30,
        difficulty: 'Kolay',
        steps: [
          'Kıymayı geniş bir kaba alın.',
          'Rendelenmiş soğan, ezilmiş sarımsak ve kıyılmış maydanozu ekleyin.',
          'Tüm baharatları ekleyip iyice yoğurun.',
          'Yoğurduğunuz harcı 30 dakika buzdolabında dinlendirin.',
          'Harçtan ceviz büyüklüğünde parçalar koparıp yuvarlayın ve hafifçe bastırarak yassılaştırın.',
          'Köfteleri ızgarada veya tavada arkalı önlü pişirin.'
        ],
        similarRecipes: [
          { id: '1', name: 'İzmir Köfte' },
          { id: '2', name: 'Adana Kebap' },
          { id: '3', name: 'İnegöl Köfte' }
        ]
      },
      {
        name: 'Mercimek Çorbası',
        description: 'Geleneksel Türk mutfağından, sebzeli kırmızı mercimek çorbası.',
        ingredients: [
          { name: 'Kırmızı mercimek', quantity: 200, unit: 'g' },
          { name: 'Soğan', quantity: 1, unit: 'adet', notes: 'Doğranmış' },
          { name: 'Havuç', quantity: 1, unit: 'adet', notes: 'Doğranmış' },
          { name: 'Patates', quantity: 1, unit: 'adet', notes: 'Küp şeklinde' },
          { name: 'Zeytinyağı', quantity: 2, unit: 'yemek kaşığı' },
          { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
          { name: 'Karabiber', quantity: 0.5, unit: 'çay kaşığı' },
          { name: 'Pul biber', quantity: 0.5, unit: 'çay kaşığı' }
        ],
        nutritionalInfo: {
          calories: 230,
          protein: 13,
          carbs: 40,
          fat: 2
        },
        costComparison: {
          restaurant: 45,
          homemade: 15
        },
        preparationTime: 40,
        difficulty: 'Kolay',
        steps: [
          'Mercimeği yıkayıp süzün.',
          'Zeytinyağında soğanları kavurun.',
          'Havuç ve patatesi ekleyip 2-3 dakika daha kavurun.',
          'Mercimek ve 6 su bardağı su ekleyip karıştırın.',
          'Tuz ve baharatları ekleyin.',
          'Kısık ateşte mercimekler yumuşayana kadar pişirin (yaklaşık 30 dakika).',
          'Blenderdan geçirip pürüzsüz hale getirin.'
        ],
        similarRecipes: [
          { id: '4', name: 'Ezogelin Çorbası' },
          { id: '5', name: 'Tarhana Çorbası' },
          { id: '6', name: 'Yayla Çorbası' }
        ]
      },
      {
        name: 'Karnıyarık',
        description: 'Kıyma ile doldurulmuş, fırında pişirilmiş patlıcan yemeği.',
        ingredients: [
          { name: 'Patlıcan', quantity: 6, unit: 'adet', notes: 'Orta boy' },
          { name: 'Dana kıyma', quantity: 400, unit: 'g' },
          { name: 'Soğan', quantity: 2, unit: 'adet', notes: 'Doğranmış' },
          { name: 'Domates', quantity: 3, unit: 'adet', notes: 'Doğranmış' },
          { name: 'Sivri biber', quantity: 4, unit: 'adet', notes: 'Doğranmış' },
          { name: 'Sarımsak', quantity: 3, unit: 'diş', notes: 'Ezilmiş' },
          { name: 'Zeytinyağı', quantity: 4, unit: 'yemek kaşığı' },
          { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
          { name: 'Karabiber', quantity: 0.5, unit: 'çay kaşığı' }
        ],
        nutritionalInfo: {
          calories: 320,
          protein: 18,
          carbs: 15,
          fat: 22
        },
        costComparison: {
          restaurant: 95,
          homemade: 50
        },
        preparationTime: 60,
        difficulty: 'Orta',
        steps: [
          'Patlıcanları alacalı soyup tuzlu suda bekletin.',
          'Patlıcanları kurulayıp kızgın yağda kızartın.',
          'Ayrı bir tavada kıymayı kavurun.',
          'Soğan, sarımsak, biber ve domatesi ekleyip pişirin.',
          'Patlıcanları ortadan yarıp içine harç doldurun.',
          'Üzerine domates dilimleri yerleştirip fırında pişirin.'
        ],
        similarRecipes: [
          { id: '7', name: 'İmam Bayıldı' },
          { id: '8', name: 'Musakka' },
          { id: '9', name: 'Patlıcan Kebabı' }
        ]
      },
      {
        name: 'Mantı',
        description: 'Türk mutfağının meşhur hamur işi, kıymalı mantı.',
        ingredients: [
          { name: 'Un', quantity: 3, unit: 'su bardağı' },
          { name: 'Yumurta', quantity: 1, unit: 'adet' },
          { name: 'Su', quantity: 1, unit: 'su bardağı' },
          { name: 'Tuz', quantity: 1, unit: 'çay kaşığı' },
          { name: 'Dana kıyma', quantity: 250, unit: 'g' },
          { name: 'Soğan', quantity: 1, unit: 'adet', notes: 'Rendelenmiş' },
          { name: 'Yoğurt', quantity: 2, unit: 'su bardağı' },
          { name: 'Sarımsaklı yağ', quantity: 2, unit: 'yemek kaşığı' }
        ],
        nutritionalInfo: {
          calories: 380,
          protein: 22,
          carbs: 45,
          fat: 12
        },
        costComparison: {
          restaurant: 85,
          homemade: 40
        },
        preparationTime: 120,
        difficulty: 'Zor',
        steps: [
          'Un, yumurta, su ve tuzu karıştırıp hamur yapın.',
          'Hamuru dinlendirip ince açın.',
          'Kare şeklinde kesin.',
          'İç harcı için kıyma, soğan, tuz ve karabiberi karıştırın.',
          'Her karenin ortasına harçtan koyup kapatın.',
          'Tuzlu suda haşlayın.',
          'Üzerine sarımsaklı yoğurt ve kızdırılmış yağ gezdirin.'
        ],
        similarRecipes: [
          { id: '10', name: 'Su Böreği' },
          { id: '11', name: 'Çiğ Börek' },
          { id: '12', name: 'Gözleme' }
        ]
      }
    ];
    
    // Return a random food option
    return foodOptions[Math.floor(Math.random() * foodOptions.length)];
  }

  /**
   * Generate mock chat response for development/demo purposes
   * @param message User message
   * @returns Mock chat response
   */
  private getMockChatResponse(message: string): ChatResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('domates') && lowerMessage.includes('peynir')) {
      return {
        text: 'Domates ve peynir ile yapabileceğiniz harika tarifler var! Caprese salatası, domates soslu makarna, ya da peynirli domates dolması yapabilirsiniz. Hangisi hakkında daha detaylı bilgi istersiniz?',
        relatedRecipe: {
          id: '101',
          name: 'Caprese Salatası'
        }
      };
    } else if (lowerMessage.includes('vegan')) {
      return {
        text: 'Vegan beslenme için harika seçenekler sunabilirim. Nohutlu sebze yemeği, mercimek köftesi veya sebzeli bulgur pilavı gibi lezzetli tarifler var. Hangi tür vegan yemeklerle ilgileniyorsunuz?'
      };
    } else if (lowerMessage.includes('tarif') || lowerMessage.includes('nasıl yapılır')) {
      return {
        text: 'Size özel tarif önerileri sunabilirim. Hangi malzemeleri kullanmak istediğinizi veya ne tür bir yemek yapmak istediğinizi söylerseniz size uygun tarifler önerebilirim.'
      };
    } else {
      return {
        text: 'Anladım. Size daha iyi yardımcı olabilmem için, hangi malzemeleriniz var veya ne tür bir yemek yapmak istediğinizi belirtebilir misiniz? Ayrıca, diyet kısıtlamalarınız varsa onları da belirtirseniz size uygun öneriler sunabilirim.'
      };
    }
  }
}

// Export a singleton instance
export const deepSeekService = new DeepSeekService();