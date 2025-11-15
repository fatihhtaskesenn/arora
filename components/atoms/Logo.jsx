'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Logo Component - Arora brand logo
 */
const Logo = ({ className = '' }) => {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <motion.div
        className="relative drop-shadow-2xl"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image 
          src="/aroraPNG.png" 
          alt="Arora Logo" 
          width={308} 
          height={308}
          className="object-contain"
          priority
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
