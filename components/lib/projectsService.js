// Projects Service - Supabase Integration
// Handles all project-related database operations

import { supabase } from './supabaseClient';

/**
 * Get all projects
 * @returns {Promise<Array>}
 */
export const getAllProjects = async () => {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log(`🔄 Fetched projects at ${timestamp}:`, data?.length || 0);

    return data.map(transformProject);
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const errorCode = error?.code || error?.hint || '';
    
    console.error('Error fetching projects:', {
      message: errorMessage,
      code: errorCode,
      details: error,
    });
    
    // Check if it's a table not found error
    if (errorMessage.includes('does not exist') || errorMessage.includes('relation') || errorCode === '42P01') {
      console.warn('⚠️ Projects table does not exist. Please run migration: supabase/migrations/001_initial_schema.sql');
    }
    
    return [];
  }
};

/**
 * Get projects by category
 * @param {string} category
 * @returns {Promise<Array>}
 */
export const getProjectsByCategory = async (category) => {
  try {
    if (!category || category === 'all') {
      return await getAllProjects();
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(transformProject);
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const errorCode = error?.code || error?.hint || '';
    
    console.error('Error fetching projects by category:', {
      message: errorMessage,
      code: errorCode,
      category,
      details: error,
    });
    
    // Check if it's a table not found error
    if (errorMessage.includes('does not exist') || errorMessage.includes('relation') || errorCode === '42P01') {
      console.warn('⚠️ Projects table does not exist. Please run migration: supabase/migrations/001_initial_schema.sql');
    }
    
    return [];
  }
};

/**
 * Get project by ID
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const getProjectById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return transformProject(data);
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const errorCode = error?.code || error?.hint || '';
    
    console.error('Error fetching project:', {
      message: errorMessage,
      code: errorCode,
      id,
      details: error,
    });
    
    return null;
  }
};

/**
 * Get featured projects (limit)
 * @param {number} count
 * @returns {Promise<Array>}
 */
export const getFeaturedProjects = async (count = 6) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(count);

    if (error) throw error;

    return data.map(transformProject);
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const errorCode = error?.code || error?.hint || '';
    
    console.error('Error fetching featured projects:', {
      message: errorMessage,
      code: errorCode,
      details: error,
    });
    
    // Check if it's a table not found error
    if (errorMessage.includes('does not exist') || errorMessage.includes('relation') || errorCode === '42P01') {
      console.warn('⚠️ Projects table does not exist. Please run migration: supabase/migrations/001_initial_schema.sql');
    }
    
    return [];
  }
};

/**
 * Create new project (Admin only)
 * @param {Object} projectData
 * @returns {Promise<Object>}
 */
export const createProject = async (projectData) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;

    return transformProject(data);
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const errorCode = error?.code || error?.hint || '';
    
    console.error('Error creating project:', {
      message: errorMessage,
      code: errorCode,
      details: error,
    });
    
    throw error;
  }
};

/**
 * Update project (Admin only)
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
export const updateProject = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return transformProject(data);
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const errorCode = error?.code || error?.hint || '';
    
    console.error('Error updating project:', {
      message: errorMessage,
      code: errorCode,
      id,
      details: error,
    });
    
    throw error;
  }
};

/**
 * Delete project (Admin only)
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const deleteProject = async (id) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const errorCode = error?.code || error?.hint || '';
    
    console.error('Error deleting project:', {
      message: errorMessage,
      code: errorCode,
      id,
      details: error,
    });
    
    throw error;
  }
};

/**
 * Transform project from database format to frontend format
 * @param {Object} project
 * @returns {Object}
 */
function transformProject(project) {
  if (!project) return null;

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image_url,
    category: project.category,
    createdAt: project.created_at,
  };
}

// Export project categories
export const projectCategories = [
  {
    id: 'all',
    name: 'Tüm Projeler',
    slug: 'all',
  },
  {
    id: 'residential',
    name: 'Konut Projeleri',
    slug: 'konut',
    icon: '🏠',
  },
  {
    id: 'commercial',
    name: 'Ticari Projeler',
    slug: 'ticari',
    icon: '🏢',
  },
  {
    id: 'landscape',
    name: 'Peyzaj',
    slug: 'peyzaj',
    icon: '🌳',
  },
  {
    id: 'other',
    name: 'Diğer',
    slug: 'diger',
    icon: '🎨',
  },
];
