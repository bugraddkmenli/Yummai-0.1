import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  email: string;
  // Add other user properties
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    AsyncStorage.getItem('hasSeenOnboarding').then(value => {
      setHasSeenOnboarding(value === 'true');
    });

    // Check if user is logged in
    AsyncStorage.getItem('user').then(userString => {
      if (userString) {
        setUser(JSON.parse(userString));
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    // Implement your sign in logic here
    // For now, we'll just simulate a successful login
    const mockUser = { id: '1', email };
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signUp = async (email: string, password: string) => {
    // Implement your sign up logic here
    // For now, we'll just simulate a successful registration
    const mockUser = { id: '1', email };
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    setHasSeenOnboarding(true);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      hasSeenOnboarding, 
      signIn, 
      signUp, 
      signOut,
      completeOnboarding 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};