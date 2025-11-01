'use client';

import { BarChart2, ShoppingBag, PackageOpen, Users } from 'lucide-react';

export default function DashboardPage() {
  // This will be replaced with real data in later steps
  const stats = [
    { name: 'Total Revenue', value: '$10,256', icon: BarChart2, color: 'bg-pink-500' },
    { name: 'Products', value: '43', icon: ShoppingBag, color: 'bg-blue-500' },
    { name: 'Orders', value: '25', icon: PackageOpen, color: 'bg-yellow-500' },
    { name: 'Customers', value: '15', icon: Users, color: 'bg-green-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Other Dashboard Widgets will be added here */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Recent orders will be displayed here.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Popular Products</h3>
            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Your best-selling products will be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}