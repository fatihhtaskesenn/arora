'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiImage } from 'react-icons/fi';
import { getAllProjects, deleteProject, projectCategories } from '@/components/lib/projectsService';
import Image from 'next/image';

export default function ProjectsListPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects
  useEffect(() => {
    let filtered = projects;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!deleteConfirm) {
      setDeleteConfirm(id);
      return;
    }

    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      setDeleteConfirm(null);
      alert('Proje başarıyla silindi!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Proje silinirken hata oluştu!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Projeler</h1>
          <p className="text-neutral-600">Toplam {filteredProjects.length} proje</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/admin/projects/new')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <FiPlus className="h-5 w-5" />
          Yeni Proje Ekle
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Proje ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            {projectCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon ? `${cat.icon} ` : ''}
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid/Table */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-neutral-200 h-64 rounded-xl" />
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
                <div className="h-4 bg-neutral-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
          <FiImage className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Proje Bulunamadı</h3>
          <p className="text-neutral-600 mb-4">Filtrelere uygun proje bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-neutral-100">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FiImage className="h-16 w-16 text-neutral-300" />
                  </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    title="Düzenle"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className={`p-3 rounded-lg transition-colors ${
                      deleteConfirm === project.id
                        ? 'bg-red-700 text-white'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                    title={deleteConfirm === project.id ? 'Onaylayın' : 'Sil'}
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Category Badge */}
                {project.category && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-neutral-800 rounded-full">
                      {projectCategories.find((c) => c.id === project.category)?.name ||
                        project.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-1">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-sm text-neutral-600 line-clamp-2">{project.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

