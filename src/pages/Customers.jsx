import React, { useState } from 'react';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  FileDownload as DownloadIcon,
  TrendingUp as HighEngagementIcon,
  TrendingDown as LowEngagementIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Customers = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    {
      id: 'CUST-001',
      name: 'John Doe',
      lastSeen: '2 hours ago',
      totalMessages: 45,
      language: 'English',
      engagement: 'high',
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      lastSeen: '1 day ago',
      totalMessages: 12,
      language: 'Hindi',
      engagement: 'low',
    },
    {
      id: 'CUST-003',
      name: 'Mike Johnson',
      lastSeen: '3 hours ago',
      totalMessages: 78,
      language: 'Urdu',
      engagement: 'high',
    },
  ];

  const chartData = [
    { name: 'Mon', interactions: 120 },
    { name: 'Tue', interactions: 150 },
    { name: 'Wed', interactions: 200 },
    { name: 'Thu', interactions: 180 },
    { name: 'Fri', interactions: 250 },
    { name: 'Sat', interactions: 300 },
    { name: 'Sun', interactions: 280 },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesFilter = selectedFilter === 'all' || customer.engagement === selectedFilter;
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.language.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    // Implement CSV export functionality
    console.log('Exporting CSV...');
  };

  return (
    <div className="p-6 ml-64 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Insights</h1>
        <div className="flex items-center space-x-4">
          <button 
            className="px-4 py-2 bg-[#25D366] text-white rounded-lg flex items-center"
            onClick={handleExportCSV}
          >
            <DownloadIcon className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Engagement</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="interactions" fill="#25D366" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers..."
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
                    <option value="all">All Engagement</option>
                    <option value="high">High Engagement</option>
                    <option value="low">Low Engagement</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Last Seen</th>
                    <th className="text-left py-3 px-4">Total Messages</th>
                    <th className="text-left py-3 px-4">Language</th>
                    <th className="text-left py-3 px-4">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{customer.name}</td>
                      <td className="py-3 px-4">{customer.lastSeen}</td>
                      <td className="py-3 px-4">{customer.totalMessages}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                          {customer.language}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {customer.engagement === 'high' ? (
                            <HighEngagementIcon className="text-green-500 mr-1" />
                          ) : (
                            <LowEngagementIcon className="text-red-500 mr-1" />
                          )}
                          <span className={`text-sm ${
                            customer.engagement === 'high' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {customer.engagement.charAt(0).toUpperCase() + customer.engagement.slice(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers; 