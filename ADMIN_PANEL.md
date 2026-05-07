# Admin Panel Documentation

## Overview

The ChuanYang Admin Panel is a comprehensive product management system built with Next.js, React, and Tailwind CSS. It provides a user-friendly interface for managing products, viewing analytics, and performing administrative tasks.

## Features

- **Dashboard**: Overview of sales metrics, product statistics, and analytics
- **Product Management**: Full CRUD operations for products
  - List all products with search and filtering
  - Add new products with detailed information
  - View and edit product details
  - Delete products with confirmation
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Real-time Updates**: Changes are reflected immediately in the UI

## Pages and Routes

### Admin Pages

```
/admin                          -> Redirects to dashboard
/admin/dashboard                -> Main dashboard with analytics
/admin/products                 -> Product list/management page
/admin/products/add             -> Add new product form
/admin/products/[id]            -> Product details and edit page
```

### API Endpoints

```
GET    /api/products            -> Get all products or single product (with ?id=)
POST   /api/products            -> Create new product
PUT    /api/products            -> Update existing product
DELETE /api/products?id={id}    -> Delete product
```

## Components and Features

### Dashboard (`/admin/dashboard`)
- **Statistics Cards**: Display total products, sales, revenue, and growth
- **Sales Chart**: Visual representation of sales and product trends using Recharts
- **Analytics Overview**: Key metrics at a glance

### Products Page (`/admin/products`)
- **Product Table**: Displays all products with key information
  - Product name
  - Category
  - Price
  - Stock quantity with status indicator
  - Product status (active/inactive)
  - Action buttons (Edit, View, Delete)
- **Search Functionality**: Filter products by name or category
- **Batch Actions**: Edit or delete multiple products
- **Stock Status Indicators**: Visual indicators for stock levels

### Add Product Form (`/admin/products/add`)
- **Product Details Section**:
  - Product name (required)
  - Description
  - Category selection
  - Price (required)
  - Cost of goods
  - Stock quantity (required)
  - SKU code
- **Product Image**: Drag-and-drop image upload
- **Status Management**: Set product as active or inactive
- **Form Validation**: Required fields validation

### Product Details Page (`/admin/products/[id]`)
- **View Mode**: Display product information in read-only format
- **Edit Mode**: Switch to edit mode to update product details
- **Image Display**: Product image preview
- **Metadata**: Display creation and update timestamps
- **Profit Margin Calculation**: Automatic calculation of profit margin percentage
- **Delete Section**: Dangerous zone with delete confirmation
- **Quick Actions**: Edit, Save, Cancel, and Delete buttons

## Using the Admin Panel

### Accessing the Admin Panel
1. Navigate to `http://localhost:3000/admin`
2. You will be automatically redirected to the dashboard

### Managing Products

#### Adding a New Product
1. Go to **Products** → Click **Add Product**
2. Fill in all required fields (marked with *)
3. Upload a product image (optional)
4. Click **Add Product** to save

#### Viewing Product Details
1. Go to **Products**
2. Click the **Edit** icon next to a product
3. View all product details in read-only mode

#### Editing a Product
1. On the product details page, click **Edit**
2. Modify the desired fields
3. Click **Save Changes** to update

#### Deleting a Product
1. On the product details page, scroll to **Danger Zone**
2. Click **Delete Product**
3. Confirm the deletion in the confirmation dialog

#### Searching for Products
1. Go to **Products**
2. Use the search bar at the top to filter by product name or category
3. Results update in real-time

### Dashboard Analytics
- View key metrics on the dashboard
- Monitor sales trends with the monthly chart
- Track product performance

## Data Structure

### Product Model
```typescript
interface Product {
  id: string;              // Unique identifier
  name: string;            // Product name
  description: string;     // Product description
  category: string;        // Product category
  price: number;           // Selling price
  cost: number;            // Cost of goods
  stock: number;           // Quantity in stock
  sku: string;             // Stock keeping unit
  status: 'active' | 'inactive';  // Product status
  image: string;           // Image URL
  createdAt: string;       // Creation timestamp
  updatedAt: string;       // Last update timestamp
}
```

## Styling and Design

The admin panel uses Tailwind CSS for styling with the following design principles:
- Clean, modern interface
- Consistent color scheme (blue primary, gray neutrals, red for danger)
- Responsive grid layouts
- Smooth transitions and hover states
- Clear visual hierarchy with typography

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f97316)
- **Danger**: Red (#dc2626)
- **Info**: Purple (#8b5cf6)
- **Neutral**: Gray (various shades)

## Icon Library

Icons are provided by **Lucide React**, including:
- `Plus`: Add button
- `Edit`: Edit action
- `Trash2`: Delete action
- `Eye`: View action
- `Package`: Products section
- `LayoutDashboard`: Dashboard section
- `ChevronLeft`: Back navigation
- `Upload`: File upload
- `Save`: Save changes
- `ImageIcon`: Image placeholder

## API Integration

The admin panel uses fetch API for HTTP requests. All API calls go through the utility functions in `lib/admin-utils.ts`:

```typescript
// Example: Create a detail
await productApi.create({
  name: 'New Product',
  category: 'Electronics',
  price: 99.99,
  // ... other fields
});

// Example: Update a detail
await productApi.update('detail-id', {
  price: 89.99,
  stock: 50,
});

// Example: Delete a detail
await productApi.delete('detail-id');
```

## Development and Customization

### Adding New Features
1. Create new components in `app/admin/components/`
2. Add new pages under `app/admin/`
3. Update API endpoints in `app/api/`
4. Use shared utilities from `lib/admin-utils.ts`

### Modifying Styles
1. Edit Tailwind classes directly in component files
2. Or create custom CSS in `app/globals.css`
3. Update color scheme by modifying className properties

### Database Integration
Currently using mock data. To integrate with a real database:
1. Replace mock data in API routes with database queries
2. Implement authentication middleware
3. Add data validation and error handling

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Multi-image upload support
- [ ] Bulk product import/export
- [ ] Advanced filtering and sorting
- [ ] Product categories management
- [ ] Inventory alerts and notifications
- [ ] Order management system
- [ ] Customer management
- [ ] Sales reports and analytics
- [ ] Product reviews and ratings management
- [ ] Discount and promotion management
- [ ] Email notifications

## Dependencies

- **Next.js 16.2.4**: React framework
- **React 19.2.4**: UI library
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React 1.14.0**: Icon library
- **Recharts 3.8.1**: Chart library

## File Structure

```
app/
  admin/
    layout.tsx                  # Admin layout with sidebar
    page.tsx                    # Admin home (redirects to dashboard)
    dashboard/
      page.tsx                  # Dashboard page
    products/
      page.tsx                  # Products list page
      add/
        page.tsx                # Add product page
      [id]/
        page.tsx                # Product details page
  api/
    products/
      route.ts                  # Products API endpoints
lib/
  admin-utils.ts                # Utility functions and API helpers
```

## Troubleshooting

### Products not loading
- Check browser console for errors
- Verify API endpoint is accessible
- Check mock data in `app/api/products/route.ts`

### Styling issues
- Ensure Tailwind CSS is properly configured
- Clear Next.js cache: `npm run dev` after changes
- Check browser inspector for class conflicts

### Form validation errors
- Check required fields are filled
- Verify input formats (e.g., price as number)
- Check console for validation errors

## Support

For issues or questions about the admin panel, please contact the development team.

---

**Last Updated**: 2024-01-20
**Version**: 1.0.0
