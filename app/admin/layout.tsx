import type { Metadata } from 'next';
import '../globals.css';
import { AdminLayoutClient } from './layout-client';

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
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
