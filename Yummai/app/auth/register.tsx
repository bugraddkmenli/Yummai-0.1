import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Surface, Checkbox } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    // Reset error state
    setError('');
    
    // Basic validation
    if (!email || !password || !confirmPassword || !displayName) {
      setError('Lütfen tüm zorunlu alanları doldurun.');
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

    try {
      setLoading(true);
      
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            phone: phone || null
          }
        }
      });
      
      setLoading(false);
      
      if (error) {
        throw error;
      }
      
      // Navigate to the first account setup screen after successful registration
      router.replace('/setup/1');
    } catch (err) {
      setLoading(false);
      setError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
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
          <Text variant="headlineSmall" style={styles.formTitle}>Hesap Oluştur</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
            label="Telefon (İsteğe bağlı)"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            keyboardType="phone-pad"
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

          <TextInput
            label="Şifre Tekrar"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={termsAccepted ? 'checked' : 'unchecked'}
              onPress={() => setTermsAccepted(!termsAccepted)}
            />
            <Text variant="bodyMedium" style={styles.termsText}>
              Kullanım koşullarını ve gizlilik politikasını kabul ediyorum
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Kayıt Ol
          </Button>

          <View style={styles.loginContainer}>
            <Text variant="bodyMedium">Zaten bir hesabınız var mı?</Text>
            <Link href="/auth/login" asChild>
              <Button mode="text" compact>
                Giriş Yap
              </Button>
            </Link>
          </View>

          <View style={styles.socialLoginContainer}>
            <Text variant="bodyMedium" style={styles.socialText}>veya şununla kayıt olun:</Text>
            <View style={styles.socialButtons}>
              <Button
                mode="outlined"
                icon="google"
                style={styles.socialButton}
                onPress={() => console.log('Google register')}
              >
                Google
              </Button>
              <Button
                mode="outlined"
                icon="facebook"
                style={styles.socialButton}
                onPress={() => console.log('Facebook register')}
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  termsText: {
    marginLeft: 8,
    flex: 1,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#f4511e',
  },
  loginContainer: {
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