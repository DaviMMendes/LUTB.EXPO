import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ayrhdvebayrzsvrttueq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5cmhkdmViYXlyenN2cnR0dWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzQ3NjgsImV4cCI6MjA5NTgxMDc2OH0.zZuefn2Dm90JTwX0iAR2oSbKitAqy1HaSuQhvvLYzWI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});