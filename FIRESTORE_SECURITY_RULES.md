# 🔐 Cấu Hình Firebase Security Rules

## ❌ Lỗi: Permission-Denied

Nếu bạn gặp lỗi:
```
FirebaseError: [code=permission-denied]: Missing or insufficient permissions
```

Điều này có nghĩa là **Firebase Security Rules chưa cho phép** truy cập collection "categories".

---

## ✅ Cách Fix

### **Option 1: Test Mode (Cho Development - Nhanh Nhất)**

**⚠️ CẢNH BÁO: Chỉ dùng cho development, KHÔNG dùng cho production!**

1. **Vào Firebase Console:**
   ```
   https://console.firebase.google.com/
   Project: chuanyang-7973f
   ```

2. **Vào Firestore Database:**
   ```
   Firestore Database → Rules tab
   ```

3. **Thay Thế Toàn Bộ Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

4. **Publish Rules**
   ```
   Nhấp "Publish"
   ```

✅ **Xong! Bây giờ bạn có thể đọc/ghi dữ liệu.**

---

### **Option 2: Authenticated Users (Recommended)**

**Cho phép các user đã đăng nhập truy cập:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /categories/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

**Cách update:**
1. Firestore Database → Rules
2. Thay thế code
3. Nhấp "Publish"

---

### **Option 3: Admin-Only Access (Most Secure)**

**Chỉ cho phép admin đọc/ghi (nếu bạn có custom claims):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /categories/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

---

## 📋 Các Rules Phổ Biến

### **Công Khai (Anyone Can Read)**
```javascript
match /categories/{document=**} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

### **Private (Only Owner)**
```javascript
match /categories/{document=**} {
  allow read, write: if resource.data.owner == request.auth.uid;
}
```

### **Public Read, Authenticated Write**
```javascript
match /categories/{document=**} {
  allow read: if true;
  allow create, write: if request.auth != null;
  allow delete: if request.auth != null && resource.data.owner == request.auth.uid;
}
```

---

## 🔍 Kiểm Tra Quyền

### **Sau khi cập nhật rules:**

1. **Reload trang:** `Ctrl + R` hoặc `Cmd + R`
2. **Xóa cache (nếu cần):**
   ```
   Nhấp Ctrl+Shift+Delete (Windows)
   Nhấp Cmd+Shift+Delete (Mac)
   ```
3. **Kiểm tra browser console** có error gì không

---

## ⚠️ Security Best Practices

| Do's | Don'ts |
|------|--------|
| ✅ Sử dụng authenticated rules | ❌ Không dùng `allow read, write: if true` cho production |
| ✅ Validate user permissions | ❌ Không cho phép anonymous write |
| ✅ Restrict data fields | ❌ Không expose sensitive data |
| ✅ Rate limit writes | ❌ Không có timeout protection |
| ✅ Use custom claims | ❌ Không dùng default user roles |

---

## 🧪 Test Rules

Firebase Console có "Rules Simulator" để test:

1. **Firestore → Rules**
2. **Nút "Rules Simulator" (ở panel kanan)**
3. **Chọn:**
   - Request type: read/write/delete
   - Path: `/categories/test`
   - Authentication: Authenticated/Unauthenticated
4. **Nhấp "Run"**

---

## 📱 Current Setup (Recommended)

Tôi khuyến khích sử dụng này cho dự án của bạn:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories - Only authenticated users can read/write
    match /categories/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }

    // Products - Same access level
    match /products/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🚀 Các Bước Để Fix

### **Step 1: Copy Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /categories/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### **Step 2: Vào Firebase Console**
- https://console.firebase.google.com/
- Project: chuanyang-7973f
- Firestore Database → Rules

### **Step 3: Paste & Publish**
- Xóa rules cũ
- Paste rules mới
- Nhấp "Publish"

### **Step 4: Reload**
- Quay lại trang admin
- Nhấp F5 hoặc Ctrl+R
- Thử thêm danh mục mới

✅ **Done!**

---

## 🆘 Troubleshooting

### **Vẫn lỗi sau khi publish?**
```
1. Xóa browser cache (Ctrl+Shift+Delete)
2. Logout rồi login lại
3. Kiểm tra rules đã publish thành công chưa
4. Check browser console (F12) có error chi tiết gì
```

### **Collection không tồn tại?**
```
- Firestore sẽ tự tạo collection khi bạn thêm document đầu tiên
- Không cần tạo collection trước
- Sau khi publish rules, thêm danh mục → collection sẽ được tạo
```

### **Timeout error?**
```
- Kiểm tra network speed
- Firestore có thể slow lần đầu
- Thử lại sau vài giây
```

---

## 📚 Tài Liệu Tham Khảo

- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Rules Language Reference](https://firebase.google.com/docs/rules/rules-language)
- [Best Practices](https://firebase.google.com/docs/firestore/security/best-practices)

---

**Sau khi cấu hình xong, error sẽ biến mất! 🎉**
