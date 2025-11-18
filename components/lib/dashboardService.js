// Dashboard Service - Supabase Integration
// Handles dashboard stats and data fetching

import { supabase } from './supabaseClient';

/**
 * Get dashboard statistics
 * @returns {Promise<Object>}
 */
export const getDashboardStats = async () => {
  try {
    // Get counts for products, projects, and messages
    const [productsResult, projectsResult, messagesResult] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }),
    ]);

    return {
      totalProducts: productsResult.count || 0,
      totalProjects: projectsResult.count || 0,
      totalMessages: messagesResult.count || 0,
      totalViews: '0', // This would come from analytics in real app
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalProducts: 0,
      totalProjects: 0,
      totalMessages: 0,
      totalViews: '0',
    };
  }
};

/**
 * Get recent products (latest 5)
 * @returns {Promise<Array>}
 */
export const getRecentProducts = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, category, stock, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category || 'Kategori Yok',
      stock: product.stock || 0,
      createdAt: new Date(product.created_at).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    }));
  } catch (error) {
    console.error('Error fetching recent products:', error);
    return [];
  }
};

/**
 * Get recent messages (latest 5)
 * @returns {Promise<Array>}
 */
export const getRecentMessages = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('id, name, subject, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data.map(message => ({
      id: message.id,
      name: message.name,
      subject: message.subject || 'Konu yok',
      status: 'unread', // In real app, this would be a field in DB
      createdAt: new Date(message.created_at).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
  } catch (error) {
    console.error('Error fetching recent messages:', error);
    return [];
  }
};

/**
 * Get recent projects (latest 5)
 * @returns {Promise<Array>}
 */
export const getRecentProjects = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data.map(project => ({
      id: project.id,
      title: project.title,
      createdAt: new Date(project.created_at).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    }));
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    return [];
  }
};













