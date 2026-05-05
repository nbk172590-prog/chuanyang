# Admin Panel - Visual Structure Guide

This document provides a visual representation of the admin panel pages and their layout based on the Figma design.

## 1. Dashboard Page (`/admin/dashboard`)

```
┌─────────────────────────────────────────────────────────┐
│ ADMIN PANEL - DASHBOARD                                 │
├────────────────────┬──────────────────────────────────┤
│                    │ Dashboard                         │
│  📊 Dashboard      │ Welcome back! Here's your sales   │
│  📦 Products       │ overview.                         │
│                    │                                   │
│  (Sidebar)         │ ┌──────────────────────────────┐  │
│                    │ │ 1,234 | $45,231 | $82,950 │  │
│                    │ │ Total  │ Total  │ Revenue │  │
│                    │ │Products│ Sales  │         │  │
│                    │ └──────────────────────────────┘  │
│                    │                                   │
│                    │ Sales & Products Overview         │
│                    │ ┌──────────────────────────────┐  │
│                    │ │   Bar Chart (6 months)      │  │
│                    │ │   Sales vs Products          │  │
│                    │ └──────────────────────────────┘  │
└────────────────────┴──────────────────────────────────┘
```

### Key Elements:
- **Statistics Cards**: 4 cards showing Total Products, Sales, Revenue, Growth
- **Monthly Chart**: Bar chart showing sales and product trends
- **Navigation Sidebar**: Access to Dashboard and Products sections

---

## 2. Products List Page (`/admin/products`)

```
┌─────────────────────────────────────────────────────────┐
│ ADMIN PANEL - PRODUCTS                                  │
├────────────────────┬──────────────────────────────────┤
│                    │ Products                          │
│  📊 Dashboard      │ Manage your product inventory     │
│  📦 Products       │                  [+ Add Product]  │
│                    │                                   │
│  (Sidebar)         │ [Search bar: "Search products"]   │
│                    │                                   │
│                    │ ┌──────────────────────────────┐  │
│                    │ │Product│Category│Price│Stock│  │
│                    │ ├──────────────────────────────┤  │
│                    │ │Wireless│Electronics│$79.99│  │
│                    │ │Headphones│ │45units│ ✎ 👁 ❌ │
│                    │ ├──────────────────────────────┤  │
│                    │ │USB-C Cable│Accessories│$12.99│ │
│                    │ │         │120 units│ ✎ 👁 ❌ │
│                    │ ├──────────────────────────────┤  │
│                    │ │[More products...]             │  │
│                    │ └──────────────────────────────┘  │
└────────────────────┴──────────────────────────────────┘
```

### Key Elements:
- **Search Bar**: Filter products by name or category
- **Product Table**: Columns for Name, Category, Price, Stock, Status, Actions
- **Action Buttons**: Edit (✎), View (👁), Delete (❌)
- **Stock Indicators**: Color-coded (Green: In Stock, Red: Out of Stock)
- **Add Product Button**: Quick link to add new product

---

## 3. Add Product Form (`/admin/products/add`)

```
┌─────────────────────────────────────────────────────────┐
│ ← ADD NEW PRODUCT                                       │
├────────────────────┬──────────────────────────────────┤
│                    │                                   │
│  📊 Dashboard      │ Fill in the product details      │
│  📦 Products       │                                   │
│                    │ Product Name *                    │
│                    │ [________________________________]│
│  (Sidebar)         │                                   │
│                    │ Description                       │
│                    │ [_______________________________]│
│                    │                                   │
│                    │ Category * │ Price *             │
│                    │ [________] │ [___________]        │
│                    │                                   │
│                    │ Stock Qty * │ SKU                 │
│                    │ [________] │ [___________]        │
│                    │                                   │
│                    │ Product Image                     │
│                    │ ┌──────────────────────────────┐  │
│                    │ │    📤 Upload Image           │  │
│                    │ │  PNG, JPG up to 10MB         │  │
│                    │ └──────────────────────────────┘  │
│                    │                                   │
│                    │ [Cancel]        [Add Product]    │
└────────────────────┴──────────────────────────────────┘
```

### Key Elements:
- **Form Fields**:
  - Product Name (required)
  - Description (textarea)
  - Category (dropdown, required)
  - Price (number, required)
  - Cost (optional)
  - Stock Quantity (number, required)
  - SKU (text)
  - Status (dropdown: Active/Inactive)
- **Image Upload**: Drag-and-drop support
- **Action Buttons**: Cancel, Add Product

---

## 4. Product Details Page (`/admin/products/[id]`)

```
┌─────────────────────────────────────────────────────────┐
│ ← WIRELESS HEADPHONES                    [Edit Button] │
│ Product ID: 1                                           │
├────────────────────┬──────────────────────────────────┤
│                    │                                   │
│  📊 Dashboard      │ ┌──────────────────────────────┐ │ │
│  📦 Products       │ │ [Product Image]              │ │ │
│                    │ │ (Placeholder)                │ │ │
│  (Sidebar)         │ └──────────────────────────────┘ │ │
│                    │                                   │ │
│                    │ Product Name: Wireless Headphones│ │
│                    │ Category: Electronics             │ │
│                    │ Price: $79.99 | Cost: $35.00    │ │
│                    │ Stock: 45 units | Status: Active │ │
│                    │ SKU: WH-001                       │ │
│                    │ Description: High-quality...     │ │
│                    │                                   │ │
│                    │        ┌──────────┐              │ │
│                    │        │ SIDEBAR  │              │ │
│                    │        ├──────────┤              │ │
│                    │        │Created:  │              │ │
│                    │        │2024-01-15│              │ │
│                    │        │Updated:  │              │ │
│                    │        │2024-01-20│              │ │
│                    │        │Profit:   │              │ │
│                    │        │56.3%     │              │ │
│                    │        │          │              │ │
│                    │        │[Delete]  │              │ │
│                    │        └──────────┘              │ │
└────────────────────┴──────────────────────────────────┘
```

### Key Elements:
- **Read Mode**:
  - Display all product information
  - Product image display
  - Metadata (created, updated dates)
  - Profit margin calculation
- **Edit Mode** (when Edit button clicked):
  - All fields become editable
  - Save and Cancel buttons appear
  - Form validation enabled
- **Delete Section**: 
  - Located in sidebar
  - Requires confirmation
  - Red "Danger Zone" styling

---

## 5. Delete Confirmation Modal

```
╔═════════════════════════════════════╗
║   CONFIRM DELETE                    ║
├─────────────────────────────────────┤
│ Are you sure you want to delete     │
│ this product? This action cannot    │
│ be undone.                          │
│                                     │
│ [Cancel]         [Delete]           │
╚═════════════════════════════════════╝
```

### Modal Features:
- Clear warning message
- Cancel button to abort
- Delete button to confirm
- Background overlay to focus attention

---

## Page Routes Summary

| Route | Purpose | Features |
|-------|---------|----------|
| `/admin` | Home | Auto-redirects to dashboard |
| `/admin/dashboard` | Analytics & Overview | Stats cards, charts |
| `/admin/products` | Product List | Table, search, CRUD actions |
| `/admin/products/add` | Add New Product | Form with validation |
| `/admin/products/[id]` | View/Edit Product | Details, edit mode, delete |

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products?id={id}` | Fetch single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products` | Update product |
| DELETE | `/api/products?id={id}` | Delete product |

---

## Component Hierarchy

```
Admin Layout
├── Sidebar Navigation
│   ├── Dashboard Link
│   └── Products Link
├── Main Content Area
│   ├── Dashboard Page
│   │   ├── Stats Cards (4x)
│   │   └── Sales Chart
│   ├── Products Page
│   │   ├── Search Bar
│   │   ├── Add Product Button
│   │   └── Products Table
│   │       └── Action Buttons
│   ├── Add Product Page
│   │   ├── Form Fields
│   │   └── Image Upload
│   └── Product Details Page
│       ├── Image Display
│       ├── Edit Form
│       ├── Information Sidebar
│       └── Delete Section
└── Modals
    ├── Delete Confirmation
    └── Image Preview
```

---

## Styling Reference

### Color Palette
- **Primary Blue**: #3b82f6 (Buttons, Links, Active States)
- **Success Green**: #10b981 (Positive Indicators, In Stock)
- **Danger Red**: #dc2626 (Delete Actions, Out of Stock)
- **Warning Orange**: #f97316 (Alerts, Low Stock)
- **Info Purple**: #8b5cf6 (Secondary Information)
- **Neutral Gray**: #6b7280 (Text, Borders)

### Typography
- **Headers**: Bold, Dark Gray
- **Body Text**: Regular, Medium Gray
- **Labels**: Semibold, Small
- **Links**: Blue, Underline on Hover

### Spacing
- **Sidebar Width**: 256px (w-64)
- **Content Padding**: 32px (p-8)
- **Card Padding**: 24px (p-6)
- **Section Gap**: 24px (gap-6)

### Responsive Design
- **Desktop**: Full 3-column layout on products page
- **Tablet**: 2-column layout adapts
- **Mobile**: Single column stack (if needed)

---

## User Workflows

### Adding a Product
1. Click "Products" in sidebar
2. Click "+ Add Product"
3. Fill all required fields (*)
4. Upload product image (optional)
5. Click "Add Product"
6. Redirected to products list

### Editing a Product
1. Click "Products" in sidebar
2. Click Edit (✎) icon
3. Click "Edit" button at top
4. Modify fields as needed
5. Click "Save Changes"
6. Changes reflected immediately

### Deleting a Product
1. On product details page
2. Scroll to "Danger Zone"
3. Click "Delete Product"
4. Confirm in dialog
5. Redirected to products list

### Searching Products
1. On products page
2. Type in search bar
3. Results filter in real-time
4. Search filters by name or category

---

**Last Updated**: 2024-01-20
**Design Version**: 1.0 (Based on Figma Design)
