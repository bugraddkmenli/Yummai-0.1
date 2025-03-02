import { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Surface, Button, TextInput, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Mock user data - in a real app, this would come from Supabase
  const [displayName, setDisplayName] = useState('Ahmet Yılmaz');
  const [email, setEmail] = useState('ahmet@example.com');
  const [phone, setPhone] = useState('+90 555 123 4567');
  const [bio, setBio] = useState('Yemek yapmayı seven bir gurme.');
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150');

  const handleSave = async () => {
    setLoading(true);
    
    // Create user profile object
    const userProfile = {
      displayName,
      email,
      phone,
      bio,
      avatarUrl
    };
    
    // TODO: Save to Supabase
    console.log('Saving user profile:', userProfile);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1500);
  };

  const handleAvatarChange = () => {
    // TODO: Implement image picker functionality
    console.log('Changing avatar...');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>Profili Düzenle</Text>
        </View>

        <Surface style={styles.section} elevation={1}>
          <View style={styles.avatarContainer}>
            <Avatar.Image 
              size={100} 
              source={{ uri: avatarUrl }} 
              style={styles.avatar}
            />
            <Button 
              mode="outlined" 
              onPress={handleAvatarChange}
              style={styles.avatarButton}
            >
              Fotoğrafı Değiştir
            </Button>
          </View>

          <TextInput
            label="Ad Soyad"
            value={displayName}
            onChangeText={setDisplayName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Telefon"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            label="Hakkımda"
            value={bio}
            onChangeText={setBio}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
          >
            Değişiklikleri Kaydet
          </Button>

          <Button
            mode="text"
            onPress={() => router.back()}
            style={styles.cancelButton}
          >
            İptal
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  section: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  avatarButton: {
    borderColor: '#f4511e',
    color: '#f4511e',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#f4511e',
  },
  cancelButton: {
    marginTop: 8,
  },
});