'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lightbox from '../molecules/Lightbox';

/**
 * ProjectGallery Component - Masonry-style project gallery with lightbox
 * @param {Object} props
 * @param {Array} props.projects - Array of project objects with image and title
 * @param {number} props.columns - Number of columns (default: auto-responsive)
 */
const ProjectGallery = ({ projects = [], columns = 'auto' }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  // Safety check for projects
  if (!projects || !Array.isArray(projects)) {
    console.warn('ProjectGallery: Invalid projects prop', projects);
    return null;
  }

  const handleImageClick = (index) => {
    try {
      if (!projects || !Array.isArray(projects) || projects.length === 0) {
        console.warn('ProjectGallery: No projects available');
        return;
      }
      
      if (index < 0 || index >= projects.length) {
        console.warn('ProjectGallery: Invalid index', index);
        return;
      }
      
      const project = projects[index];
      if (!project) {
        console.warn('ProjectGallery: Project not found at index', index);
        return;
      }
      
      if (!project.image || typeof project.image !== 'string' || project.image.trim() === '') {
        console.warn('ProjectGallery: Invalid image URL', project);
        return;
      }
      
      console.log('ProjectGallery: Opening lightbox for project', index, project);
      setSelectedImageIndex(index);
    } catch (error) {
      console.error('ProjectGallery: Error in handleImageClick', error);
    }
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevious = () => {
    if (projects.length === 0) return;
    setSelectedImageIndex((prev) => 
      prev > 0 ? prev - 1 : projects.length - 1
    );
  };

  const handleNext = () => {
    if (projects.length === 0) return;
    setSelectedImageIndex((prev) => 
      prev < projects.length - 1 ? prev + 1 : 0
    );
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index, src) => {
    console.error('Project gallery image failed:', src);
    setLoadedImages(prev => ({ ...prev, [index]: true })); // Still mark as loaded to remove placeholder
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Grid columns class based on columns prop
  const gridColsClass = columns === 'auto' 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
    : `grid-cols-${columns}`;

  return (
    <>
      <motion.div
        className={`grid ${gridColsClass} gap-4 sm:gap-6`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, index) => {
          // Safety check for project and image
          if (!project || !project.image) {
            return null;
          }
          
          return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-lg cursor-pointer"
            whileHover={{ scale: 1.02 }}
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
                key={`gallery-${index}`}
                src={project.image}
                alt={project.title || `Proje ${index + 1}`}
                className="absolute inset-0 w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  opacity: loadedImages[index] ? 1 : 0,
                  transition: 'opacity 0.6s ease-in-out, transform 0.5s ease',
                  willChange: 'opacity, transform'
                }}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index, project.image)}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-600/90 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center px-4 sm:px-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <svg
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-4 text-white"
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
                  <p className="text-white font-semibold text-sm sm:text-base md:text-lg">
                    Detayları Gör
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Project Info */}
            {project.title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 z-10">
                <motion.h3
                  className="text-white font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                {project.description && (
                  <motion.p
                    className="text-white/80 text-xs sm:text-sm line-clamp-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                )}
              </div>
            )}

            {/* Badge */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
              <motion.div
                className="bg-white/20 backdrop-blur-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-white text-[10px] sm:text-xs font-semibold"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Proje #{index + 1}
              </motion.div>
            </div>
          </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox */}
      {selectedImageIndex !== null && 
       selectedImageIndex >= 0 && 
       selectedImageIndex < projects.length && 
       projects[selectedImageIndex] && 
       projects[selectedImageIndex].image && 
       typeof projects[selectedImageIndex].image === 'string' && (
        <Lightbox
          image={String(projects[selectedImageIndex].image)}
          title={projects[selectedImageIndex]?.title || `Proje ${selectedImageIndex + 1}`}
          onClose={handleClose}
          onPrevious={projects.length > 1 ? handlePrevious : undefined}
          onNext={projects.length > 1 ? handleNext : undefined}
          hasPrevious={projects.length > 1 && selectedImageIndex > 0}
          hasNext={projects.length > 1 && selectedImageIndex < projects.length - 1}
        />
      )}
    </>
  );
};

export default ProjectGallery;

