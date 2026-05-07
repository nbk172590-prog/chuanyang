'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { ChevronLeft, Save, Trash2, Loader, AlertCircle, CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<Partial<Product>>({});

  // Fetch detail from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const product: Product = {
            id: docSnap.id,
            name: data.name || '',
            description: data.description || '',
            category: data.category || '',
            price: data.price || 0,
            stock: data.stock || 0,
            status: data.status || 'inactive',
            image: data.image || '/placeholder.jpg',
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
          setProduct(product);
          setFormData(product);
        } else {
          setError('Sản phẩm không tồn tại');
        }
      } catch (err: any) {
        console.error('Error fetching detail:', err);
        setError('Lỗi khi tải sản phẩm: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseInt(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      if (!formData.name?.trim()) {
        setError('Vui lòng nhập tên sản phẩm');
        setIsSubmitting(false);
        return;
      }

      if (formData.price && formData.price < 0) {
        setError('Giá không thể âm');
        setIsSubmitting(false);
        return;
      }

      if (formData.stock && formData.stock < 0) {
        setError('Tồn kho không thể âm');
        setIsSubmitting(false);
        return;
      }

      const docRef = doc(db, 'products', productId);
      await updateDoc(docRef, {
        name: formData.name?.trim(),
        description: formData.description?.trim(),
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        status: formData.status,
        updatedAt: serverTimestamp(),
      });

      setSuccess('Cập nhật sản phẩm thành công!');
      if (product) {
        setProduct({ ...product, ...formData } as Product);
      }
      setIsEditing(false);
    } catch (err: any) {
      setError('Lỗi khi cập nhật sản phẩm: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      const docRef = doc(db, 'products', productId);
      await deleteDoc(docRef);
      setSuccess('Xóa sản phẩm thành công! Đang chuyển hướng...');
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    } catch (err: any) {
      setError('Lỗi khi xóa sản phẩm: ' + err.message);
      setIsSubmitting(false);
      setDeleteConfirm(false);
    }
  };

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

  if (!product) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Sản phẩm không tìm thấy</h1>
          <Link href="/admin/products" className="text-blue-600 hover:underline mt-4 inline-block">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2">ID: {product.id}</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Chỉnh Sửa
          </button>
        )}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Product Details Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Sản Phẩm
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                ) : (
                  <p className="text-gray-800 text-lg font-medium">{product.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô Tả
                </label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                ) : (
                  <p className="text-gray-600">{product.description || '—'}</p>
                )}
              </div>

              {/* Category */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Danh Mục
                  </label>
                  {isEditing ? (
                    <select
                      name="category"
                      value={formData.category || ''}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Điện tử">Điện tử</option>
                      <option value="Phụ kiện">Phụ kiện</option>
                      <option value="Quần áo">Quần áo</option>
                      <option value="Nhà cửa">Nhà cửa</option>
                      <option value="Khác">Khác</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">{product.category}</p>
                  )}
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá Bán
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="price"
                      value={formData.price || 0}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold text-lg">
                      {product.price.toLocaleString('vi-VN')} ₫
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn Kho
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock || 0}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  ) : (
                    <p className="text-gray-800">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock} sản phẩm
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng Thái
                </label>
                {isEditing ? (
                  <select
                    name="status"
                    value={formData.status || 'active'}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ngừng</option>
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                  </span>
                )}
              </div>

              {/* Form Actions */}
              {isEditing && (
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(product);
                      setError('');
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader size={18} className="animate-spin" />}
                    <Save size={18} />
                    {isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Thông Tin</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-600">Ngày Tạo</p>
                <p className="text-gray-800 font-medium">
                  {product.createdAt.toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Cập Nhật Lần Cuối</p>
                <p className="text-gray-800 font-medium">
                  {product.updatedAt.toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>

          {/* Delete Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <h3 className="text-lg font-bold text-red-600 mb-4">Vùng Nguy Hiểm</h3>
            <p className="text-gray-600 text-sm mb-4">
              Xóa sản phẩm này sẽ xóa vĩnh viễn khỏi hệ thống.
            </p>
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Trash2 size={18} />
                Xóa Sản Phẩm
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-800 font-semibold">Bạn có chắc chắn?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-red-400 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader size={16} className="animate-spin" />}
                    {isSubmitting ? 'Đang xóa...' : 'Xóa'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


