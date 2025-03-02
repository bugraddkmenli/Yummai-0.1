import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
// Replace the @env import with hardcoded values or Constants from expo-constants
import Constants from 'expo-constants';

// Access environment variables from Constants.expoConfig.extra
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 'https://your-project-url.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});