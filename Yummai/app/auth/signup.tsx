import { useState } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput, Button, Surface, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignup = async () => {
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    if (!termsAccepted) {
      setError('Devam etmek için kullanım koşullarını kabul etmelisiniz.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In a real app, this would use Supabase authentication
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: {
      //       name,
      //     }
      //   }
      // });
      
      // if (error) throw error;

      // Simulate successful signup for demo
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Create a basic user profile
      const userProfile = {
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        email: email,
      };
      
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      // Navigate to setup screens
      router.replace('/setup/1');
    } catch (error: any) {
      setError(error.message || 'Kayıt olurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="headlineMedium" style={styles.appName}>Yummai</Text>
        </View>

        <Surface style={styles.formContainer} elevation={2}>
          <Text variant="titleLarge" style={styles.title}>Hesap Oluştur</Text>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <TextInput
            label="Ad Soyad"
            value={name}
            onChangeText={setName}
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
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            right={
              <TextInput.Icon 
                icon={secureTextEntry ? "eye" : "eye-off"} 
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
            style={styles.input}
          />

          <TextInput
            label="Şifre Tekrar"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmSecureTextEntry}
            mode="outlined"
            right={
              <TextInput.Icon 
                icon={confirmSecureTextEntry ? "eye" : "eye-off"} 
                onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
              />
            }
            style={styles.input}
          />

          <View style={styles.termsContainer}>
            <Checkbox.Android
              status={termsAccepted ? 'checked' : 'unchecked'}
              onPress={() => setTermsAccepted(!termsAccepted)}
              color="#f4511e"
            />
            <View style={styles.termsTextContainer}>
              <Text variant="bodyMedium">
                <Text>Kayıt olarak </Text>
                <TouchableOpacity onPress={() => router.push('/auth/terms')}>
                  <Text style={styles.termsText}>Kullanım Koşulları</Text>
                </TouchableOpacity>
                <Text> ve </Text>
                <TouchableOpacity onPress={() => router.push('/profile/privacy')}>
                  <Text style={styles.termsText}>Gizlilik Politikası</Text>
                </TouchableOpacity>
                <Text>'nı kabul ediyorum.</Text>
              </Text>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={loading}
            disabled={loading}
            style={styles.signupButton}
          >
            Kayıt Ol
          </Button>

          <View style={styles.loginContainer}>
            <Text variant="bodyMedium">Zaten hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text variant="bodyMedium" style={styles.loginText}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
          </View>
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
    flexGrow: 1,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  appName: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  formContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#f4511e',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  termsText: {
    color: '#f4511e',
    fontWeight: 'bold',
  },
  signupButton: {
    marginBottom: 16,
    backgroundColor: '#f4511e',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    color: '#f4511e',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});