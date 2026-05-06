'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Package, LogOut, Mail, Tag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/context/ProtectedRoute';
import { ReactNode, useState } from 'react';

interface AdminLayoutClientProps {
  children: ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-gray-600 mt-1">ChuanYang Global</p>
          </div>

          <nav className="mt-6 flex-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <LayoutDashboard size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Package size={20} className="mr-3" />
              <span>Quản lý sản phẩm</span>
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Tag size={20} className="mr-3" />
              <span>Quản lý danh mục</span>
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className="p-6 border-t">
            {user && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Mail size={16} className="text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 break-all">{user.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg disabled:opacity-50"
            >
              <LogOut size={20} className="mr-3" />
              <span>{isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
