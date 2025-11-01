'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PackageOpen, 
  BarChart2, 
  Settings, 
  Menu, 
  X, 
  LogOut 
} from 'lucide-react';

// This will be replaced with actual auth logic in Phase 1 - Step 2
const useAuth = () => {
  return { 
    user: { name: 'Admin User' },
    signOut: () => console.log('Sign out clicked')
  };
};

import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Check if mobile and set sidebar closed by default on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', href: '/admin/orders', icon: PackageOpen },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar for mobile */}
      <div 
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 flex z-40 md:hidden`}
        role="dialog" 
        aria-modal="true"
      >
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar component */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <SidebarContent navItems={navItems} pathname={pathname} user={user} signOut={signOut} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className={`${sidebarOpen ? 'md:flex' : 'hidden'} hidden md:flex md:flex-shrink-0`}>
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <SidebarContent navItems={navItems} pathname={pathname} user={user} signOut={signOut} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <h1 className="text-2xl font-semibold text-gray-900 my-auto">
                Admin Dashboard
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-gray-700 mr-4">{user.name}</span>
              <button
                type="button"
                className="bg-gray-100 p-1 rounded-full text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={signOut}
              >
                <span className="sr-only">Sign out</span>
                <LogOut className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
};

type SidebarContentProps = {
  navItems: NavItem[];
  pathname: string;
  user: { name: string };
  signOut: () => void;
};

function SidebarContent({ navItems, pathname, user, signOut }: SidebarContentProps) {
  return (
    <>
      <div className="flex items-center flex-shrink-0 px-4">
        <h2 className="text-xl font-bold text-white">Your Store</h2>
      </div>
      <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  } mr-3 h-6 w-6`}
                  aria-hidden={true}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                  Admin
                </p>
              </div>
            </div>
            <button
              type="button"
              className="text-gray-300 hover:text-white"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}