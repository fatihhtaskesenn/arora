'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';

/**
 * Conditional Layout Wrapper
 * Shows Navbar and Footer only on public pages
 * Hides them on admin pages
 */
export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current path is admin page
  const isAdminPage = pathname?.startsWith('/admin');

  // Don't show Navbar and Footer on admin pages
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Show Navbar and Footer on public pages
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}















