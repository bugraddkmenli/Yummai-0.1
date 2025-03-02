import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OnboardingScreen1() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/2');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text variant="headlineLarge" style={styles.title}>Yemek Yapmayı Öğrenin</Text>
        <Text variant="bodyLarge" style={styles.description}>
          Binlerce tarifi keşfedin ve adım adım talimatlarla lezzetli yemekler yapmayı öğrenin.
        </Text>
        <MaterialCommunityIcons
          name="food-variant"
          size={120}
          color="#f4511e"
          style={styles.icon}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleNext}
          style={styles.button}
        >
          İleri
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