import { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Hide the native splash screen
    SplashScreen.hideAsync();
    
    // After 3 seconds, navigate to the first onboarding screen
    const timer = setTimeout(() => {
      router.replace('/onboarding/1');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>kitchen stories</Text>
      <Text variant="bodyLarge" style={styles.subtitle}>ANYONE CAN COOK</Text>
      <View style={styles.footer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
        />
        <Text variant="bodySmall" style={styles.footerText}>
          curated by Mobbin
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: '400',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  footerText: {
    color: '#666',
  },
});