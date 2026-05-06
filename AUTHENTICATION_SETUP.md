# 🔐 Hướng Dẫn Firebase Authentication

## ✅ Đã Cài Đặt Xong

Tôi đã thêm hoàn chỉnh hệ thống xác thực Firebase cho admin panel. Dưới đây là những gì đã được thực hiện:

### 📁 Các File Mới Được Tạo

1. **`/context/AuthContext.tsx`** - Auth Context & Hook
   - Quản lý trạng thái đăng nhập
   - Cung cấp hook `useAuth()` để sử dụng khắp ứng dụng

2. **`/context/ProtectedRoute.tsx`** - Protected Route Component
   - Bảo vệ tất cả trang admin
   - Tự động chuyển hướng đến login nếu chưa đăng nhập

3. **`/app/login/page.tsx`** - Trang Đăng Nhập
   - Giao diện đẹp với Tailwind CSS
   - Thông báo lỗi chi tiết
   - Tự động chuyển hướng nếu đã đăng nhập

4. **`/app/admin/layout-client.tsx`** - Admin Layout Component
   - Hiển thị email người dùng
   - Chức năng Đăng xuất
   - Bảo vệ tất cả trang con trong `/admin`

### 🔄 Các File Được Cập Nhật

1. **`firebase-config.js`** - Thêm export `auth`
2. **`app/layout.tsx`** - Thêm `AuthProvider`
3. **`app/admin/layout.tsx`** - Sử dụng `AdminLayoutClient`

---

## 🚀 Cách Sử Dụng

### Tạo Tài Khoản Admin Trên Firebase

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Chọn project **chuanyang-7973f**
3. Vào **Authentication** → **Users**
4. Nhấp **Add User**
5. Nhập email và password
6. Nhấp **Add User**

### Đăng Nhập

1. Truy cập `http://localhost:3000/login`
2. Nhập email và password
3. Nếu đúng, sẽ được chuyển tới `/admin/dashboard`

### Đăng Xuất

- Nhấp nút **Đăng xuất** ở góc dưới sidebar
- Sẽ được chuyển về trang login

---

## 🛡️ Các Trang Được Bảo Vệ

Tất cả trang con trong `/admin/` đều được bảo vệ:
- ✅ `/admin/dashboard`
- ✅ `/admin/products`
- ✅ `/admin/products/[id]`
- ✅ `/admin/products/add`

Nếu truy cập mà chưa đăng nhập → Chuyển tới `/login`

---

## 🔌 Sử Dụng Hook `useAuth()`

```tsx
'use client';

import { useAuth } from '@/context/AuthContext';

export function MyComponent() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) return <div>Đang tải...</div>;

  if (isAuthenticated) {
    return (
      <div>
        <p>Email: {user?.email}</p>
        <button onClick={() => logout()}>Đăng xuất</button>
      </div>
    );
  }

  return <div>Chưa đăng nhập</div>;
}
```

---

## ⚙️ Tính Năng

✅ **Xác thực qua Firebase Auth**  
✅ **Local Storage Persistence** - Lưu trạng thái đăng nhập  
✅ **Protected Routes** - Tự động kiểm tra auth  
✅ **Loading State** - Hiển thị loading khi kiểm tra auth  
✅ **Error Handling** - Thông báo lỗi rõ ràng  
✅ **User Info** - Hiển thị email trong sidebar  
✅ **Logout** - Chức năng đăng xuất hoàn chỉnh  

---

## 💡 Lưu Ý

- Persistence được bật, nên người dùng sẽ vẫn đăng nhập sau khi reload trang
- Trang login tự động chuyển hướng nếu đã đăng nhập
- Admin pages sẽ chuyển hướng nếu chưa đăng nhập
- Có loading state để tránh flash content

---

## 📝 Firebase Security Rules (Tùy Chọn)

Để bảo vệ Firestore/Realtime Database, thêm rules này:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

**Tất cả đã sẵn sàng! 🎉 Bạn có thể bắt đầu sử dụng ngay.**
