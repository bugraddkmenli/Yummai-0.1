import { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Surface, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AICameraScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Kamera izni gerekli!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        name: 'Köfte',
        ingredients: ['kıyma', 'soğan', 'baharat'],
        calories: 250,
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <View style={styles.container as any}>
      {!image ? (
        <View style={styles.uploadContainer}>
          <MaterialCommunityIcons name="camera-plus" size={64} color="#f4511e" />
          <Text variant="headlineSmall" style={styles.title}>
            Yemeğin fotoğrafını çekin veya yükleyin
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            AI teknolojimiz yemeği tanıyıp size tarif önerecek
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={takePhoto}
              style={styles.button}
              icon="camera"
            >
              Fotoğraf Çek
            </Button>
            <Button
              mode="outlined"
              onPress={pickImage}
              style={styles.button}
              icon="image"
            >
              Galeriden Seç
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Surface style={styles.imageContainer} elevation={2}>
            <Image source={{ uri: image }} style={styles.image} />
          </Surface>

          {analyzing ? (
            <View style={styles.analyzingContainer}>
              <Text>Yemek analiz ediliyor...</Text>
            </View>
          ) : result ? (
            <Card style={styles.resultCard}>
              <Card.Content>
                <Text variant="titleLarge">{result.name}</Text>
                <Text variant="bodyMedium" style={styles.ingredients}>
                  Malzemeler: {result.ingredients.join(', ')}
                </Text>
                <Text variant="bodyMedium">Kalori: {result.calories} kcal</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => router.push('/recipe/similar')}>
                  Benzer Tarifleri Gör
                </Button>
              </Card.Actions>
            </Card>
          ) : null}

          <Button
            mode="contained"
            onPress={() => {
              setImage(null);
              setResult(null);
            }}
            style={styles.newPhotoButton}
          >
            Yeni Fotoğraf
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
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
    color: '#f4511e',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    marginVertical: 8,
  },
  resultContainer: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  analyzingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  resultCard: {
    marginVertical: 16,
  },
  ingredients: {
    marginVertical: 8,
  },
  newPhotoButton: {
    marginTop: 16,
    backgroundColor: '#f4511e',
  },
});