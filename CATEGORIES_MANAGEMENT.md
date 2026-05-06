# 📦 Hướng Dẫn Quản Lý Danh Mục Sản Phẩm

## ✅ Hoàn Thành Triển Khai

Tôi đã tạo trang quản lý danh mục sản phẩm với đầy đủ tính năng CRUD (Create, Read, Update, Delete) sử dụng Firebase Firestore.

---

## 📁 Các File Được Thêm/Cập Nhật

### **Tạo Mới:**
- `/app/admin/categories/page.tsx` - Trang quản lý danh mục đầy đủ chức năng

### **Cập Nhật:**
- `firebase-config.ts` - Thêm export `db` (Firestore)
- `firebase-config.js` - Thêm export `db`
- `app/admin/layout-client.tsx` - Thêm link "Quản lý danh mục" trong sidebar

---

## 🎯 Tính Năng

✅ **Xem Danh Sách** - Hiển thị tất cả danh mục theo thứ tự mới nhất
✅ **Thêm Mới** - Tạo danh mục mới với tên và mô tả
✅ **Chỉnh Sửa** - Cập nhật tên và mô tả danh mục
✅ **Xóa** - Xóa danh mục với xác nhận
✅ **Real-time Update** - Dữ liệu tự động cập nhật khi có thay đổi
✅ **Error Handling** - Thông báo lỗi chi tiết
✅ **Loading States** - Trạng thái loading khi lưu dữ liệu
✅ **Validation** - Kiểm tra tên danh mục không được để trống

---

## 🚀 Cách Sử Dụng

### **1. Truy Cập Trang Quản Lý Danh Mục**
- Vào admin panel: `http://localhost:3000/admin`
- Nhấp vào menu **"Quản lý danh mục"** trong sidebar

### **2. Thêm Danh Mục Mới**
```
1. Nhấp nút "Thêm Danh Mục Mới"
2. Nhập Tên Danh Mục *
3. Nhập Mô Tả (tùy chọn)
4. Nhấp "Thêm Mới"
```

### **3. Chỉnh Sửa Danh Mục**
```
1. Nhấp nút "Sửa" trên hàng danh mục cần chỉnh sửa
2. Sửa Tên Danh Mục hoặc Mô Tả
3. Nhấp "Cập Nhật"
```

### **4. Xóa Danh Mục**
```
1. Nhấp nút "Xóa" trên hàng danh mục
2. Xác nhận xóa trong dialog
3. Danh mục sẽ được xóa từ Firestore
```

---

## 🗄️ Cấu Trúc Dữ Liệu Firestore

```javascript
Collection: "categories"

Document Structure:
{
  id: "auto-generated",
  name: "Tên danh mục",           // Required
  description: "Mô tả",            // Optional
  createdAt: Timestamp,            // Auto-set on creation
  updatedAt: Timestamp             // Auto-updated
}

Ví dụ:
{
  id: "abc123",
  name: "Điện tử",
  description: "Các sản phẩm điện tử",
  createdAt: Timestamp(1620000000),
  updatedAt: Timestamp(1620000000)
}
```

---

## ⚙️ Firestore Setup (Nếu Cần)

### **1. Tạo Collection trên Firebase Console**
```
1. Vào: https://console.firebase.google.com/
2. Project: chuanyang-7973f
3. Firestore Database → Create Database
4. Location: Chọn gần nhất
5. Security Rules: Start in test mode (hoặc production)
```

### **2. Tạo Collection "categories"**
```
1. Firestore Database → Collections
2. Nhấp "+ Start collection"
3. Collection ID: categories
4. Nhấp "Next"
5. Nhấp "Save" (để trống, sẽ auto-create khi thêm dữ liệu)
```

### **3. Security Rules (Production)**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /categories/{document=**} {
      allow read: if true;  // Everyone can read
      allow write: if request.auth != null;  // Only authenticated users
    }
  }
}
```

---

## 📊 Thông Báo & Trạng Thái

| Thông Báo | Ý Nghĩa |
|-----------|---------|
| ✅ Thêm danh mục mới thành công! | Danh mục đã được tạo |
| ✅ Cập nhật danh mục thành công! | Danh mục đã được cập nhật |
| ✅ Xóa danh mục thành công! | Danh mục đã bị xóa |
| ❌ Vui lòng nhập tên danh mục | Tên danh mục không được để trống |
| ❌ Lỗi khi tải danh mục | Kiểm tra kết nối Firebase |
| ⏳ Đang tải danh mục... | Đang lấy dữ liệu từ Firestore |

---

## 🔄 Real-time Synchronization

Trang sử dụng Firebase Realtime Listener (`onSnapshot`), nên:
- ✅ Dữ liệu tự động cập nhật khi có thay đổi
- ✅ Không cần reload trang
- ✅ Nhiều người dùng có thể cùng quản lý

---

## 📱 Responsive Design

Trang được thiết kế responsive:
- ✅ Desktop: Hiển thị full table
- ✅ Tablet: Tự động điều chỉnh
- ✅ Mobile: Hiển thị dạng responsive (có thể cần scroll)

---

## 🆘 Troubleshooting

### **Lỗi: "Lỗi khi tải danh mục"**
```
Kiểm tra:
1. Firebase credentials đúng?
2. Firestore Database đã enable?
3. Network connection có bình thường?
4. Xem browser console (F12) có error gì?
```

### **Danh mục không lưu được**
```
Kiểm tra:
1. Bạn đã đăng nhập chưa?
2. Firebase Security Rules cho phép write?
3. Tên danh mục không để trống?
4. Firestore có quota đủ không?
```

### **Danh mục không tự động cập nhật**
```
Kiểm tra:
1. Realtime Listener có active không?
2. Browser console có error không?
3. Firestore Rules có chặn read không?
```

---

## 💡 Tips & Best Practices

1. **Tên Danh Mục**: Sử dụng tên rõ ràng, ngắn gọn
2. **Mô Tả**: Thêm mô tả giúp người dùng hiểu rõ hơn
3. **Xóa Danh Mục**: Kiểm tra đã xóa hết sản phẩm của danh mục chưa
4. **Backup**: Firestore tự động backup hàng ngày

---

## 📝 Phần Tiếp Theo (Tùy Chọn)

Bạn có thể:
- Thêm filter/search danh mục
- Thêm upload hình ảnh cho danh mục
- Tạo danh mục con (sub-categories)
- Thêm drag-drop sắp xếp danh mục
- Export danh mục sang CSV

---

**Hệ thống quản lý danh mục đã sẵn sàng! 🎉**

Bạn có thể bắt đầu thêm danh mục sản phẩm ngay bây giờ.
