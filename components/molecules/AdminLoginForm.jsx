'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { login } from '@/components/lib/auth';

export default function AdminLoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: 'arora@arora.com', // Default email
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 rounded-lg 
                     text-white placeholder-neutral-500
                     focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                     transition-all duration-200"
            placeholder="arora@arora.com"
            aria-label="Email adresi"
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
          Şifre
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-12 py-3 bg-neutral-800 border border-neutral-700 rounded-lg 
                     text-white placeholder-neutral-500
                     focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                     transition-all duration-200"
            placeholder="••••••••"
            aria-label="Şifre"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 
                     hover:text-emerald-400 transition-colors"
            aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5" />
            ) : (
              <FiEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg"
        >
          <p className="text-sm text-rose-400">{error}</p>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 
                 bg-gradient-to-r from-emerald-500 to-cyan-500 
                 text-white font-semibold rounded-lg
                 hover:from-emerald-600 hover:to-cyan-600
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-neutral-900
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span>Giriş yapılıyor...</span>
          </>
        ) : (
          <>
            <FiLogIn className="h-5 w-5" />
            <span>Giriş Yap</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
}


