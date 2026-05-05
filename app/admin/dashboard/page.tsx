'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

const dashboardData = [
  { name: 'Jan', sales: 4000, products: 240 },
  { name: 'Feb', sales: 3000, products: 220 },
  { name: 'Mar', sales: 2000, products: 229 },
  { name: 'Apr', sales: 2780, products: 200 },
  { name: 'May', sales: 1890, products: 221 },
  { name: 'Jun', sales: 2390, products: 250 },
];

const stats = [
  {
    title: 'Total Products',
    value: '1,234',
    icon: Package,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    title: 'Total Sales',
    value: '45.231.000 ₫',
    icon: ShoppingCart,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    title: 'Revenue',
    value: '82.950.000 ₫',
    icon: DollarSign,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
  },
  {
    title: 'Growth',
    value: '+23.5%',
    icon: TrendingUp,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
  },
];

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your sales overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-lg`}>
                  <Icon className={`${stat.textColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Sales & Products Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" />
            <Bar dataKey="products" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
