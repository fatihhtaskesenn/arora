import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  const isClient = typeof window !== 'undefined';
  const env = process.env.NODE_ENV;
  
  if (isClient) {
    // On client-side, log error but don't throw (to prevent app crash)
    console.error('❌ Supabase environment variables are missing!');
    console.error('Please check your Vercel environment variables:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL');
    console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  } else {
    // On server-side, throw error
    throw new Error(
      `Supabase environment variables are missing! (${env})\n` +
      'Please check your .env.local file or Vercel environment variables:\n' +
      '- NEXT_PUBLIC_SUPABASE_URL\n' +
      '- NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }
}

// Create Supabase client with fallback values (empty strings won't work but won't crash)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Helper: Get current user
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
  
  return user;
};

// Helper: Check if user is admin
export const isAdmin = async () => {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // Check role from user metadata
  const role = user.user_metadata?.role || user.raw_user_meta_data?.role;
  return role === 'admin';
};

// Helper: Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};


