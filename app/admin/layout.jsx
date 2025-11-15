'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/components/lib/auth';
import AdminSidebar from '@/components/organisms/AdminSidebar';
import AdminNavbar from '@/components/organisms/AdminNavbar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      setMounted(true);
      
      // Admin login sayfasında auth check yapma
      if (pathname === '/admin') {
        return;
      }

      // Diğer admin sayfalarında auth kontrolü yap
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Login sayfası için özel layout
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar - Fixed height */}
          <AdminNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          {/* Page Content - With proper spacing from header */}
          <main className="flex-1 overflow-y-auto bg-neutral-50">
            <div className="p-4 lg:p-6 pt-8 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

