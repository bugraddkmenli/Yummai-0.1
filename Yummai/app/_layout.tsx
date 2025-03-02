import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter, useSegments, Slot } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '../hooks/useAuth';
import { useColorScheme } from 'react-native';

// Custom theme based on Kitchen Stories design
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF6B3E',
    secondary: '#1A1A1A',
    background: '#FFFFFF',
    surface: '#FFFFFF',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
  },
};

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const hasCompletedSetup = await AsyncStorage.getItem('hasCompletedSetup');

        setIsReady(true);
        await SplashScreen.hideAsync();

        // Only navigate after the component is ready
        if (!hasSeenOnboarding) {
          router.replace('/onboarding/1');
        } else if (!isLoggedIn) {
          router.replace('/auth/login');
        } else if (!hasCompletedSetup) {
          router.replace('/setup/1');
        } else {
          router.replace('/(app)');
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return <Slot />;
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#f4511e',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
          }}
        />
      </PaperProvider>
    </AuthProvider>
  );
}