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
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      flowType: 'pkce',
    },
  }
);

// Handle auth errors silently (especially refresh token errors)
if (typeof window !== 'undefined') {
  // Single auth state change listener to handle token errors
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'TOKEN_REFRESHED') {
      // Token refreshed successfully
      console.log('✅ Token refreshed');
    } else if (event === 'SIGNED_OUT') {
      // User signed out, clear any stale tokens
      if (!session && typeof window !== 'undefined' && window.localStorage) {
        try {
          const keys = Object.keys(window.localStorage);
          keys.forEach(key => {
            if (key.startsWith('sb-')) {
              window.localStorage.removeItem(key);
            }
          });
        } catch (error) {
          console.warn('⚠️ Error clearing localStorage:', error);
        }
      }
    }
  });

  // Suppress console errors for refresh token issues
  // This is a workaround for Supabase's internal token refresh mechanism
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const errorMessage = args.join(' ');
    // Suppress refresh token errors from console
    if (errorMessage.includes('Refresh Token') || 
        errorMessage.includes('refresh_token') ||
        errorMessage.includes('Invalid Refresh Token') ||
        errorMessage.includes('Refresh Token Not Found')) {
      // Silently clear invalid tokens
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const keys = Object.keys(window.localStorage);
          keys.forEach(key => {
            if (key.startsWith('sb-')) {
              window.localStorage.removeItem(key);
            }
          });
        }
      } catch (clearError) {
        // Ignore clear errors
      }
      // Don't log to console
      return;
    }
    // Log other errors normally
    originalConsoleError.apply(console, args);
  };
}

// Helper: Get current user
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    
    if (error) {
      // Silently handle refresh token errors
      if (error?.message?.includes('Refresh Token') || 
          error?.message?.includes('refresh_token') ||
          error?.message?.includes('Invalid Refresh Token') ||
          error?.message?.includes('Refresh Token Not Found')) {
        // Clear invalid tokens
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            const keys = Object.keys(window.localStorage);
            keys.forEach(key => {
              if (key.startsWith('sb-')) {
                window.localStorage.removeItem(key);
              }
            });
          } catch (clearError) {
            // Ignore clear errors
          }
        }
        return null;
      }
      console.error('Error getting user:', error.message);
      return null;
    }
    
    return user;
  } catch (error) {
    // Handle any unexpected errors
    if (error?.message?.includes('Refresh Token') || 
        error?.message?.includes('refresh_token') ||
        error?.message?.includes('Invalid Refresh Token') ||
        error?.message?.includes('Refresh Token Not Found')) {
      // Clear invalid tokens silently
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const keys = Object.keys(window.localStorage);
          keys.forEach(key => {
            if (key.startsWith('sb-')) {
              window.localStorage.removeItem(key);
            }
          });
        } catch (clearError) {
          // Ignore clear errors
        }
      }
      return null;
    }
    console.error('Unexpected error getting user:', error);
    return null;
  }
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


