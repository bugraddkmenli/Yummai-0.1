import { useState } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      await AsyncStorage.setItem('isLoggedIn', 'true');
      router.replace('/');
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
      console.error(err);
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
          <Text variant="headlineLarge" style={styles.logoText}>Yummai</Text>
          <Text variant="titleMedium">Fine-Dining AI Yemek Uygulaması</Text>
        </View>

        <Surface style={styles.formContainer} elevation={2}>
          <Text variant="headlineSmall" style={styles.formTitle}>Giriş Yap</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Giriş Yap
          </Button>

          <Link href="/auth/forgot-password" asChild>
            <Button mode="text" style={styles.forgotButton}>
              Şifremi Unuttum
            </Button>
          </Link>

          <View style={styles.registerContainer}>
            <Text variant="bodyMedium">Hesabınız yok mu?</Text>
            <Link href="/auth/register" asChild>
              <Button mode="text" compact>
                Kayıt Ol
              </Button>
            </Link>
          </View>

          <View style={styles.socialLoginContainer}>
            <Text variant="bodyMedium" style={styles.socialText}>veya şununla giriş yapın:</Text>
            <View style={styles.socialButtons}>
              <Button
                mode="outlined"
                icon="google"
                style={styles.socialButton}
                onPress={() => console.log('Google login')}
              >
                Google
              </Button>
              <Button
                mode="outlined"
                icon="facebook"
                style={styles.socialButton}
                onPress={() => console.log('Facebook login')}
              >
                Facebook
              </Button>
            </View>
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
    padding: 16,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  formContainer: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  formTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#f4511e',
  },
  forgotButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  socialLoginContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  socialText: {
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});