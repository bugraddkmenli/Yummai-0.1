import { useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Button, TextInput, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function SetupPersonalInfoScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleComplete = async () => {
    try {
      // Save personal info
      const personalInfo = {
        firstName,
        lastName,
        age: parseInt(age) || 0,
        weight: parseInt(weight) || 0,
        height: parseInt(height) || 0,
        profileImage,
      };
      
      await AsyncStorage.setItem('personalInfo', JSON.stringify(personalInfo));
      
      // Mark setup as completed
      await AsyncStorage.setItem('hasCompletedSetup', 'true');
      
      // Navigate to main app
      router.replace('/(app)');
    } catch (error) {
      console.error('Error saving personal info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={0}>
        <Text variant="headlineSmall" style={styles.title}>Kişisel Bilgiler</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Kişisel bilgilerinizi girerek profilinizi tamamlayın.
        </Text>
      </Surface>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text variant="headlineMedium">?</Text>
            </View>
          )}
          <Button onPress={pickImage} mode="outlined" style={styles.imageButton}>
            Fotoğraf Seç
          </Button>
        </View>

        <TextInput
          label="Ad"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Soyad"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Yaş"
          value={age}
          onChangeText={setAge}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        
        <TextInput
          label="Kilo (kg)"
          value={weight}
          onChangeText={setWeight}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        
        <TextInput
          label="Boy (cm)"
          value={height}
          onChangeText={setHeight}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={handleComplete}
          style={styles.button}
        >
          Hesabı Tamamla
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f4511e',
  },
  subtitle: {
    color: '#666',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    marginBottom: 8,
  },
  changePhotoText: {
    color: '#f4511e',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 8,
  },
});