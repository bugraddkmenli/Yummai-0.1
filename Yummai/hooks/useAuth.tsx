import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // For demo purposes, we'll use AsyncStorage
        // In a real app, you would use Supabase session
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsAuthenticated(isLoggedIn === 'true');
        
        if (isLoggedIn === 'true') {
          const userProfile = await AsyncStorage.getItem('userProfile');
          setUser(userProfile ? JSON.parse(userProfile) : null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // In a real app, you would subscribe to auth state changes
    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     setIsAuthenticated(!!session);
    //     setUser(session?.user || null);
    //     setIsLoading(false);
    //   }
    // );

    // return () => {
    //   authListener.subscription.unsubscribe();
    // };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // In a real app, you would use Supabase auth
      // const { error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      
      // if (error) throw error;

      // For demo purposes
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Mock user data
      const mockUser = {
        email,
        firstName: 'Demo',
        lastName: 'User',
      };
      
      await AsyncStorage.setItem('userProfile', JSON.stringify(mockUser));
      
      setIsAuthenticated(true);
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // In a real app, you would use Supabase auth
      // const { error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: userData,
      //   },
      // });
      
      // if (error) throw error;

      // For demo purposes
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      const userProfile = {
        email,
        ...userData,
      };
      
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      setIsAuthenticated(true);
      setUser(userProfile);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // In a real app, you would use Supabase auth
      // await supabase.auth.signOut();

      // For demo purposes
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userProfile');
      
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);