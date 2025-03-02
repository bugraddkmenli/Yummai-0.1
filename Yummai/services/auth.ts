import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data?.session) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
    }

    return {
      user: data?.user || null,
      session: data?.session || null,
      error: null,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return {
      user: null,
      session: null,
      error: error as Error,
    };
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return {
      user: data?.user || null,
      session: data?.session || null,
      error: null,
    };
  } catch (error) {
    console.error('Error signing up:', error);
    return {
      user: null,
      session: null,
      error: error as Error,
    };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    await AsyncStorage.removeItem('isLoggedIn');

    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error: error as Error };
  }
};

/**
 * Reset password with email
 */
export const resetPassword = async (
  email: string
): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'yummai://reset-password',
    });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { error: error as Error };
  }
};

/**
 * Get the current session
 */
export const getCurrentSession = async (): Promise<{
  session: Session | null;
  error: Error | null;
}> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    return {
      session: data?.session || null,
      error: null,
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      session: null,
      error: error as Error,
    };
  }
};

/**
 * Get the current user
 */
export const getCurrentUser = async (): Promise<{
  user: User | null;
  error: Error | null;
}> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;

    return {
      user: data?.user || null,
      error: null,
    };
  } catch (error) {
    console.error('Error getting user:', error);
    return {
      user: null,
      error: error as Error,
    };
  }
};