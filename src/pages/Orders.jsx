import React, { useState } from 'react';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  FileDownload as DownloadIcon,
  WhatsApp as WhatsAppIcon,
  Storage as CrmIcon,
} from '@mui/icons-material';

const Orders = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      product: 'Pizza Margherita',
      status: 'New',
      whatsapp: '+1 234 567 8900',
      date: '2024-04-19',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      product: 'Burger Combo',
      status: 'In Progress',
      whatsapp: '+1 234 567 8901',
      date: '2024-04-19',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      product: 'Pasta Carbonara',
      status: 'Delivered',
      whatsapp: '+1 234 567 8902',
      date: '2024-04-18',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 ml-64 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-[#25D366] text-white rounded-lg flex items-center">
            <DownloadIcon className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                className="border rounded-lg px-4 py-2"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">WhatsApp</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.product}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{order.whatsapp}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full">
                        <WhatsAppIcon />
                      </button>
                      <button className="p-2 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                        <CrmIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders; 