'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { Plus, Edit2, Trash2, Loader, AlertCircle, CheckCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Fetch categories in real-time
  useEffect(() => {
    try {
      const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
              id: doc.id,
              name: docData.name,
              description: docData.description,
              createdAt: docData.createdAt?.toDate() || new Date(),
              updatedAt: docData.updatedAt?.toDate() || new Date(),
            };
          });
          setCategories(data);
          setLoading(false);
        },
        (err: any) => {
          // Error callback
          console.error('Firestore error:', err);
          if (err.code === 'permission-denied') {
            setError(
              'Lỗi quyền truy cập: Firestore Security Rules chưa được cấu hình đúng. Vui lòng xem hướng dẫn để setup.'
            );
          } else {
            setError('Lỗi khi tải danh mục: ' + err.message);
          }
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      setError('Lỗi khi tải danh mục: ' + err.message);
      setLoading(false);
    }
  }, []);

  // Add or update category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      if (!formData.name.trim()) {
        setError('Vui lòng nhập tên danh mục');
        setSaving(false);
        return;
      }

      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        updatedAt: new Date(),
      };

      if (editingId) {
        // Update existing category
        await updateDoc(doc(db, 'categories', editingId), categoryData);
        setSuccess('Cập nhật danh mục thành công!');
      } else {
        // Add new category
        await addDoc(collection(db, 'categories'), {
          ...categoryData,
          createdAt: new Date(),
        });
        setSuccess('Thêm danh mục mới thành công!');
      }

      // Reset form
      setFormData({ name: '', description: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Lỗi không xác định');
    } finally {
      setSaving(false);
    }
  };

  // Edit category
  const handleEdit = (category: Category) => {
    setFormData({ name: category.name, description: category.description });
    setEditingId(category.id);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  // Delete category
  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;

    try {
      await deleteDoc(doc(db, 'categories', id));
      setSuccess('Xóa danh mục thành công!');
    } catch (err: any) {
      setError('Lỗi khi xóa danh mục: ' + err.message);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Đang tải danh mục...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản Lý Danh Mục</h1>
        <p className="text-gray-600">Tạo, chỉnh sửa và xóa danh mục sản phẩm</p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Thêm Danh Mục Mới
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingId ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên Danh Mục *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ví dụ: Điện tử, Quần áo, ..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={saving}
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô Tả</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Nhập mô tả danh mục..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={saving}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
              >
                {saving && <Loader size={16} className="animate-spin" />}
                {editingId ? 'Cập Nhật' : 'Thêm Mới'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">
              Chưa có danh mục nào. Hãy tạo danh mục đầu tiên!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Tên Danh Mục
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Mô Tả</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Ngày Tạo
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{category.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm max-w-xs truncate">
                        {category.description || '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.createdAt.toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          disabled={saving}
                        >
                          <Edit2 size={16} />
                          <span className="text-sm">Sửa</span>
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          disabled={saving}
                        >
                          <Trash2 size={16} />
                          <span className="text-sm">Xóa</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-900 font-medium">
          Tổng số danh mục: <span className="text-2xl font-bold">{categories.length}</span>
        </p>
      </div>
    </div>
  );
}
