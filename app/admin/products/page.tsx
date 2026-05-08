'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase-config';
import { Plus, Edit, Trash2, Eye, Loader, AlertCircle, CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  description?: string;
  createdAt: Date;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch products in real-time
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
              id: doc.id,
              name: docData.name || '',
              category: docData.category || '',
              price: docData.price || 0,
              stock: docData.stock || 0,
              status: docData.status || 'inactive',
              image: docData.image || '/placeholder.jpg',
              description: docData.description || '',
              createdAt: docData.createdAt?.toDate() || new Date(),
            } as Product;
          });
          setProducts(data);
          setLoading(false);
        },
        (err: any) => {
          console.error('Firestore error:', err);
          if (err.code === 'permission-denied') {
            setError(
              'Lỗi quyền truy cập: Firestore Security Rules chưa được cấu hình đúng.'
            );
          } else {
            setError('Lỗi khi tải sản phẩm: ' + err.message);
          }
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      setError('Lỗi khi tải sản phẩm: ' + err.message);
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);
      await deleteDoc(doc(db, 'products', id));
      setSuccess('Xóa sản phẩm thành công!');
      setDeleteConfirm(null);
    } catch (err: any) {
      setError('Lỗi khi xóa sản phẩm: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sản Phẩm</h1>
          <p className="text-gray-600 mt-2">Quản lý kho hàng sản phẩm</p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Thêm Sản Phẩm
        </Link>
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

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên Sản Phẩm</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Danh Mục</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giá</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tồn Kho</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng Thái</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-800 font-semibold">
                  {product.price.toLocaleString('vi-VN')} ₫
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.stock} sản phẩm
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'active'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {product.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => window.open(`/shop/${product.id}`, '_blank')}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                      title="Xem"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      disabled={deleting}
                      className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600">
              {products.length === 0
                ? 'Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!'
                : 'Không tìm thấy sản phẩm. Hãy thử tìm kiếm khác.'}
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-900 font-medium">
            Tổng sản phẩm: <span className="text-2xl font-bold">{products.length}</span>
          </p>
        </div>
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-900 font-medium">
            Hoạt động: <span className="text-2xl font-bold">{products.filter(p => p.status === 'active').length}</span>
          </p>
        </div>
        <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-orange-900 font-medium">
            Hết hàng: <span className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</span>
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Xác Nhận Xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc muốn xóa sản phẩm này? Thao tác này không thể hoàn tác.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {deleting && <Loader size={16} className="animate-spin" />}
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
