import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen3() {
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      // Navigate to signup
      router.replace('/auth/signup');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text variant="headlineLarge" style={styles.title}>Sağlıklı Beslenin</Text>
        <Text variant="bodyLarge" style={styles.description}>
          Besleyici tarifler ve kişiselleştirilmiş önerilerle sağlıklı bir yaşam tarzı edinin.
        </Text>
        <MaterialCommunityIcons
          name="heart-pulse"
          size={120}
          color="#f4511e"
          style={styles.icon}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleGetStarted}
          style={styles.button}
        >
          Başlayalım
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#f4511e',
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  icon: {
    marginVertical: 30,
  },
  buttonContainer: {
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 8,
  },
});