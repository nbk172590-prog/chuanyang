'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase-config';
import { ChevronLeft, Upload, Loader, AlertCircle, CheckCircle, X } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { storage } from '@/firebase-config';

interface Category {
  id: string;
  name: string;
}
interface Setting {
  id: string;
  name: string;
  field: string;
  options: string[];
}

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    details: string;
    category: string;
    price: string;
    discountPrice: number;
    stock: string;
    status: string;
    images: string[];
    [key: string]: any;
  }>({
    name: '',
    description: '',
    details: '',
    category: '',
    price: '',
    discountPrice: 0,
    stock: '',
    status: 'active',
    images: [] as string[],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDetailsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      details: value,
    }));
  };

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
            };
          });
          setCategories(data);
          setLoadingCategories(false);
        },
        (err) => {
          console.error('Lỗi khi tải danh mục:', err);
          setLoadingCategories(false);
        }
      );
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

          // Initialize form data with setting fields
          const settingsObject: { [key: string]: any } = {};
          data.forEach((setting: any) => {
            settingsObject[setting.field] = '';
          });
          setFormData((prev) => ({
            ...prev,
            ...settingsObject,
          }));

          setLoadingCategories(false);
        },
        (err) => {}
      );
      return () => {
        unsubscribe();
        unsubscribeSetting();
      };
    } catch (err) {
      console.error('Lỗi khi tải danh mục:', err);
      setLoadingCategories(false);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Chỉ chấp nhận file ảnh');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
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

      // Update state with new images
      setImageFiles((prev) => [...prev, ...validFiles]);
      setImagePreviews((prev) => [...prev, ...uploadedUrls]);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
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
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.name.trim()) {
        setError('Vui lòng nhập tên sản phẩm');
        setIsSubmitting(false);
        return;
      }

      if (!formData.category) {
        setError('Vui lòng chọn danh mục');
        setIsSubmitting(false);
        return;
      }

      if (!formData.price || parseFloat(formData.price) < 0) {
        setError('Vui lòng nhập giá hợp lệ');
        setIsSubmitting(false);
        return;
      }

      if (!formData.stock || parseInt(formData.stock) < 0) {
        setError('Vui lòng nhập tồn kho hợp lệ');
        setIsSubmitting(false);
        return;
      }

      // Save to Firestore
      const productData: { [key: string]: any } = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        details: formData.details.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseInt(formData.discountPrice as any, 10) : 0,
        stock: parseInt(formData.stock),
        status: formData.status,
        image: formData.images[0] || '/placeholder.jpg',
        images: formData.images,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add settings to productData
      settings.forEach((setting) => {
        if (formData[setting.field]) {
          productData[setting.field] = formData[setting.field];
        }
      });

      await addDoc(collection(db, 'products'), productData);

      setSuccess('Thêm sản phẩm thành công!');
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    } catch (err: any) {
      setError('Lỗi khi thêm sản phẩm: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Thêm Sản Phẩm Mới</h1>
          <p className="text-gray-600 mt-2">Điền thông tin chi tiết sản phẩm bên dưới</p>
        </div>
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

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên Sản Phẩm *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
              disabled={isSubmitting}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mô Tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
              rows={4}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          {/* Product Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh Sản Phẩm</label>
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
            {uploadingImages && <p className="mt-2 text-sm text-blue-600">Đang upload ảnh...</p>}
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
          </div>

          {/* Product Details */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Chi Tiết Sản Phẩm
            </label>
            <ReactQuill
              value={formData.details}
              onChange={handleDetailsChange}
              theme="snow"
              readOnly={isSubmitting}
              placeholder="Nhập chi tiết sản phẩm..."
              className="min-h-[250px] bg-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Danh Mục *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={isSubmitting || loadingCategories}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            >
              <option value="">
                {loadingCategories ? 'Đang tải danh mục...' : 'Chọn danh mục'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Giá Bán *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0"
              step="1"
              disabled={isSubmitting}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          {/* Discount Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Giảm giá (%)</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleInputChange}
              placeholder="0"
              step="1"
              disabled={isSubmitting}
              max={100}
              min={0}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tồn Kho *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="0"
              disabled={isSubmitting}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng Thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngừng</option>
            </select>
          </div>

          {/* Settings Fields */}
          {settings.map((setting) => (
            <div key={setting.id}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {setting.name}
              </label>
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
            </div>
          ))}

          {/* Submit Buttons */}
          <div className="md:col-span-2 flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader size={20} className="animate-spin" />}
              {isSubmitting ? 'Đang thêm...' : 'Thêm Sản Phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
