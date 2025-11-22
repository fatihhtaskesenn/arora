'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import Lightbox from '../molecules/Lightbox';
import { getFeaturedProjects } from '../lib/projectsService';

/**
 * ProjectsPreview Component - Displays featured projects on homepage
 * Shows latest 6 projects from Supabase - ONLY DATABASE
 */
const ProjectsPreview = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [loading, setLoading] = useState(true);

  // REMOVED: All dummy projects data (now using Supabase only)

  // Fetch latest 6 projects from Supabase on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        console.log('🔄 Fetching projects from Supabase...');
        const projects = await getFeaturedProjects(6);
        
        if (!isMounted) return;
        
        if (projects && projects.length > 0) {
          console.log('✅ Loaded projects from Supabase:', projects.length);
          // Transform Supabase data to match component format
          const transformedProjects = projects.map(project => ({
            image: project.image,
            title: project.title,
          }));
          setDisplayedProjects(transformedProjects);
        } else {
          console.warn('⚠️ No projects found in database');
          setDisplayedProjects([]);
        }
      } catch (error) {
        console.error('❌ Error loading projects from Supabase:', error);
        setDisplayedProjects([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index, src) => {
    console.error('Preview image failed:', src);
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => 
      prev > 0 ? prev - 1 : displayedProjects.length - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev < displayedProjects.length - 1 ? prev + 1 : 0
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-neutral-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-6 py-2 mb-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full text-indigo-300 font-semibold text-sm backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Portfolyo
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Yaptığımız İşler
          </h2>

          <p className="text-xl text-neutral-300 leading-relaxed">
            Müşterilerimiz için gerçekleştirdiğimiz özel projeleri keşfedin.
            Her proje, kalite anlayışımızın bir yansımasıdır.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-2xl aspect-[4/3]" />
              </div>
            ))}
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Henüz Proje Eklenmemiş
            </h3>
            <p className="text-neutral-300 mb-6">
              Admin panelinden yeni projeler ekleyebilirsiniz.
            </p>
            <Link href="/admin/projects/new">
              <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                İlk Projeyi Ekle
              </button>
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {displayedProjects.map((project, index) => {
              // Safety check for project and image
              if (!project || !project.image) {
                return null;
              }
              
              return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleImageClick(index)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
                {/* Loading Placeholder */}
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
                    <div className="animate-pulse">
                      <svg className="w-16 h-16 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                )}
                
                <img
                  key={`project-${index}`}
                  src={project.image}
                  alt={project.title || `Proje ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="eager"
                  fetchPriority={index < 3 ? 'high' : 'auto'}
                  decoding="async"
                  style={{
                    opacity: loadedImages[index] ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out, transform 0.7s ease',
                    willChange: 'opacity, transform'
                  }}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index, project.image)}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/80 group-hover:to-purple-600/80 flex items-center justify-center transition-all duration-500"
                  initial={{ opacity: 0 }}
                >
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      className="w-16 h-16 text-white drop-shadow-lg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>

              {/* Project Title */}
              {project.title && (
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
              )}

              {/* Corner Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg" />
              </div>
            </motion.div>
            );
          })}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/projects">
            <motion.button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-indigo-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tüm Projeleri Görüntüle
              <HiArrowRight 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && displayedProjects[selectedImageIndex]?.image && (
        <Lightbox
          image={displayedProjects[selectedImageIndex].image}
          title={displayedProjects[selectedImageIndex]?.title || `Proje ${selectedImageIndex + 1}`}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={selectedImageIndex > 0}
          hasNext={selectedImageIndex < displayedProjects.length - 1}
        />
      )}
    </section>
  );
};

export default ProjectsPreview;

