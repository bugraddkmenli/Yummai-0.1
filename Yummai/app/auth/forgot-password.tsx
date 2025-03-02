import { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import React from 'react';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    // Reset states
    setError('');
    setSuccess(false);
    
    // Basic validation
    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }

    try {
      setLoading(true);
      
      // Use Supabase to send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'yummai://auth/update-password',
      });
      
      setLoading(false);
      
      if (error) {
        throw error;
      }
      
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      setError('Şifre sıfırlama isteği gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
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
          <Text variant="headlineSmall" style={styles.formTitle}>Şifremi Unuttum</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? (
            <Text style={styles.successText}>
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
            </Text>
          ) : null}

          <TextInput
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Şifremi Sıfırla
          </Button>

          <Link href="/auth/login" asChild>
            <Button mode="text" style={styles.backButton}>
              Giriş Sayfasına Dön
            </Button>
          </Link>
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
  backButton: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginBottom: 16,
    textAlign: 'center',
  },
});