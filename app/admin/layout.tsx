import type { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard, Package, LogOut } from 'lucide-react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin - ChuanYang',
  description: 'Product Management Admin Panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-600 mt-1">ChuanYang Global</p>
        </div>

        <nav className="mt-6">
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
            <span>Products</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
