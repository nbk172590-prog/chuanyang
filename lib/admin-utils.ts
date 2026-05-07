// Admin Panel Helper Functions and Types

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  sku: string;
  status: 'active' | 'inactive';
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const apiBaseUrl = '/api';

// Product API helpers
export const productApi = {
  async getAll() {
    const response = await fetch(`${apiBaseUrl}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${apiBaseUrl}/products?id=${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await fetch(`${apiBaseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create detail');
    return response.json();
  },

  async update(id: string, data: Partial<Product>) {
    const response = await fetch(`${apiBaseUrl}/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    if (!response.ok) throw new Error('Failed to update detail');
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`${apiBaseUrl}/products?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete detail');
    return response.json();
  },
};

// Utility functions
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const calculateProfit = (price: number, cost: number) => {
  return ((price - cost) / price) * 100;
};

export const calculateInventoryValue = (price: number, stock: number) => {
  return price * stock;
};

export const getStockStatus = (stock: number) => {
  if (stock === 0) return { status: 'out-of-stock', label: 'Out of Stock', color: 'red' };
  if (stock < 10) return { status: 'low-stock', label: 'Low Stock', color: 'yellow' };
  return { status: 'in-stock', label: 'In Stock', color: 'green' };
};

export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};
