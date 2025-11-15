// Authentication System
// DEPRECATED: This file is kept for backwards compatibility
// Use supabaseAuth.js instead

// Re-export everything from supabaseAuth
export {
  login,
  logout,
  isAuthenticated,
  getUser,
  isAdmin,
  getDemoCredentials,
  onAuthStateChange,
  getSession,
} from './supabaseAuth';

console.warn(
  '⚠️  You are using the deprecated auth.js file. Please import from supabaseAuth.js instead.'
);

