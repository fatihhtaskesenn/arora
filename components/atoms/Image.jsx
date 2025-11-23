'use client';

import NextImage from 'next/image';
import { useState } from 'react';

/**
 * Image Component - Wrapper over next/image with lazy loading and placeholder
 * @param {string} src - Image source
 * @param {string} alt - Alt text (required for accessibility)
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} className - Additional CSS classes
 * @param {boolean} priority - Load image with priority
 * @param {string} objectFit - Object fit property
 */
const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  fill = false,
  sizes,
  quality = 85,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <NextImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={`
          transition-all duration-300
          ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'}
          ${objectFit === 'cover' ? 'object-cover' : ''}
          ${objectFit === 'contain' ? 'object-contain' : ''}
          ${objectFit === 'fill' ? 'object-fill' : ''}
        `}
        onLoad={handleLoadingComplete}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
      )}
    </div>
  );
};

export default Image;























