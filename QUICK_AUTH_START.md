# 🎯 Admin Authentication - Hướng Dẫn Nhanh

## 📋 Tài Liệu Liên Quan

1. **[Hướng Dẫn Chi Tiết](./AUTHENTICATION_SETUP.md)** - Setup & sử dụng
2. **[Tóm Tắt Triển Khai](./AUTH_IMPLEMENTATION_SUMMARY.md)** - Các thay đổi đã thực hiện

---

## ⚡ 5 Bước Nhanh

### **Bước 1: Tạo Tài Khoản Admin**
```
1. Vào: https://console.firebase.google.com/
2. Project: chuanyang-7973f
3. Authentication → Users → Add User
4. Email: admin@example.com
5. Password: yourpassword
```

### **Bước 2: Chạy Dev Server**
```bash
npm run dev
# Truy cập: http://localhost:3000
```

### **Bước 3: Đăng Nhập**
```
URL: http://localhost:3000/login
Email: admin@example.com
Password: yourpassword
```

### **Bước 4: Kiểm Tra Dashboard**
```
Sau login → /admin/dashboard
Nút Đăng xuất → Quay lại login
```

### **Bước 5: Thử Protected Routes**
```
Logout → Truy cập /admin/products → Redirect tới login ✅
```

---

## 🔑 Key Files

```
📁 context/
   ├── AuthContext.tsx       ← Auth logic
   └── ProtectedRoute.tsx    ← Route protection

📁 app/
   ├── layout.tsx            ← AuthProvider
   ├── login/page.tsx        ← Login page
   └── admin/
       ├── layout.tsx        ← Meta
       └── layout-client.tsx ← UI + logout

firebase-config.js/ts       ← Firebase setup
```

---

## 🎨 Customization

### **Thay Đổi URL Login**
```tsx
// app/admin/layout-client.tsx
// Thay dòng 24:
router.push('/login');  // → router.push('/custom-login');
```

### **Thêm User Role**
```tsx
// context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  role?: 'admin' | 'editor';  // ← Thêm vào
  // ...
}
```

### **Thêm "Remember Me"**
```tsx
// app/login/page.tsx
const [rememberMe, setRememberMe] = useState(false);
// Set persistence dựa trên rememberMe
```

---

## ✨ Features

✅ Firebase Email/Password Auth  
✅ Protected Admin Routes  
✅ Auto Redirect on Login/Logout  
✅ Session Persistence  
✅ User Info Display  
✅ Vietnamese Error Messages  
✅ Loading States  
✅ useAuth() Hook  

---

## 🆘 Cần Giúp?

Kiểm tra:
- [ ] Firebase credentials đúng?
- [ ] Tài khoản admin đã được tạo?
- [ ] Dev server đang chạy?
- [ ] Local Storage được bật?
- [ ] Xem browser console có lỗi không?

---

**Đã sẵn sàng! 🚀**
