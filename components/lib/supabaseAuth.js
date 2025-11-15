// Supabase Authentication System
// Replaces the dummy auth system with real Supabase Auth

import { supabase } from './supabaseClient';

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user, session}>}
 */
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || 'Giriş başarısız');
    }

    // Check if user has admin role
    const role = data.user?.user_metadata?.role || data.user?.raw_user_meta_data?.role;
    
    if (role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Bu kullanıcı admin değil');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout current user
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    return false;
  }
};

/**
 * Get current user
 * @returns {Promise<User|null>}
 */
export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) return null;
    
    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'Admin User',
      role: user.user_metadata?.role || user.raw_user_meta_data?.role || 'user',
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

/**
 * Check if current user is admin
 * @returns {Promise<boolean>}
 */
export const isAdmin = async () => {
  try {
    const user = await getUser();
    return user?.role === 'admin';
  } catch (error) {
    return false;
  }
};

/**
 * Get demo credentials (for development)
 */
export const getDemoCredentials = () => ({
  email: 'admin@arora.com',
  password: 'admin123',
});

/**
 * Listen to auth state changes
 * @param {Function} callback
 * @returns {Object} subscription
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};

/**
 * Get current session
 * @returns {Promise<Session|null>}
 */
export const getSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    return null;
  }
};


