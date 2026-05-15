'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  collection,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase-config';
import { storage } from '@/firebase-config';
import { ChevronLeft, Save, Trash2, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Product {
  id: string;
  name: string;
  description: string;
  details: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

interface Setting {
  id: string;
  name: string;
  field: string;
  options: string[];
}
interface Category {
  id: string;
  name: string;
}
export default function ProductDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get('id') as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const handleDetailsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      details: value,
    }));
  };

  // Fetch detail from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const product: Product = {
            ...data,
            id: docSnap.id,
            name: data.name || '',
            description: data.description || '',
            details: data.details || '',
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
    const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            name: docData.name,
          };
        });
        setCategories(data);
      },
      (err) => {
        console.error('Lỗi khi tải danh mục:', err);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [productId]);

  useEffect(() => {
    try {
      const qSetting = query(collection(db, 'settings'));
      const unsubscribeSetting = onSnapshot(
        qSetting,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
              id: doc.id,
              ...docData,
            };
          });
          setSettings(data as Setting[]);
        },
        (err) => {
          console.error('Lỗi khi tải settings:', err);
        }
      );
      return () => {
        unsubscribeSetting();
      };
    } catch (err) {
      console.error('Lỗi khi tải settings:', err);
    }
  }, []);

  useEffect(() => {
    if (!product) return;
    const loadedImages = product.images?.length
      ? product.images
      : product.image
        ? [product.image]
        : [];

    setImagePreviews(loadedImages);
    setFormData((prev) => ({
      ...prev,
      ...product,
      images: loadedImages,
    }));
  }, [product]);
  const intFields = ['price', 'stock', 'discountPrice'];
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: intFields.includes(name) ? parseInt(value) : value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Chỉ chấp nhận file ảnh');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Kích thước ảnh không được vượt quá 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploadingImages(true);
    setError('');

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 9);
        const fileName = `products/${timestamp}-${randomString}-${file.name}`;
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setImageFiles((prev) => [...prev, ...validFiles]);
      setImagePreviews((prev) => [...prev, ...uploadedUrls]);
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls],
      }));

      setSuccess(`Đã upload ${uploadedUrls.length} ảnh thành công!`);
    } catch (err: any) {
      console.error('Lỗi upload ảnh:', err);
      setError('Lỗi khi upload ảnh: ' + err.message);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
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
      const updateData: { [key: string]: any } = {
        name: formData.name?.trim(),
        description: formData.description?.trim(),
        details: formData.details?.trim(),
        category: formData.category,
        price: formData.price,
        discountPrice: formData.discountPrice || 0,
        stock: formData.stock,
        status: formData.status,
        image: formData.images?.[0] || product?.image || '/placeholder.jpg',
        images: formData.images || product?.images || [product?.image || '/placeholder.jpg'],
        updatedAt: serverTimestamp(),
      };

      // Add settings to updateData
      settings.forEach((setting) => {
        updateData[setting.field] = formData[setting.field] || '';
      });

      await updateDoc(docRef, updateData);

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
        <Link
          href="/admin/products"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mô Tả</label>
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

              {/* Product Images */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ảnh Sản Phẩm
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isSubmitting || uploadingImages}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Chọn một hoặc nhiều ảnh, mỗi ảnh tối đa 5MB.
                    </p>
                    {uploadingImages && (
                      <p className="mt-2 text-sm text-blue-600">Đang upload ảnh...</p>
                    )}
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {imagePreviews.map((src, index) => (
                          <div
                            key={src + index}
                            className="relative rounded-lg overflow-hidden border border-gray-200"
                          >
                            <img
                              src={src}
                              alt={`Ảnh sản phẩm ${index + 1}`}
                              className="h-28 w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-white/90 text-red-600 rounded-full p-1 shadow hover:bg-white"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {imagePreviews.map((src, index) => (
                      <img
                        key={src + index}
                        src={src}
                        alt={`Ảnh sản phẩm ${index + 1}`}
                        className="h-28 w-full object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chi Tiết Sản Phẩm
                </label>
                {isEditing ? (
                  <ReactQuill
                    value={formData.details || ''}
                    onChange={handleDetailsChange}
                    theme="snow"
                    readOnly={isSubmitting}
                    placeholder="Nhập chi tiết sản phẩm..."
                    className="min-h-[250px] bg-white"
                  />
                ) : (
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.details || '<p>—</p>' }}
                  />
                )}
              </div>

              {/* Category */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Danh Mục</label>
                  {isEditing ? (
                    <select
                      name="category"
                      value={formData.category || ''}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-800">{product.category}</p>
                  )}
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Giá Bán</label>
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
                    Giảm giá (%)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice || 0}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      max={100}
                      min={0}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold text-lg">
                      {product.discountPrice ? product.discountPrice + '%' : '—'}
                    </p>
                  )}
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tồn Kho</label>
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stock} sản phẩm
                    </span>
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng Thái</label>
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
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'active'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {product.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                  </span>
                )}
              </div>

              {/* Settings Fields */}
              {settings.map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {setting.name}
                  </label>
                  {isEditing ? (
                    <select
                      name={setting.field}
                      value={formData[setting.field] || ''}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="">Chọn {setting.name.toLowerCase()}</option>
                      {setting.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-800">
                      {formData[setting.field] || product[setting.field] || '—'}
                    </p>
                  )}
                </div>
              ))}

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
