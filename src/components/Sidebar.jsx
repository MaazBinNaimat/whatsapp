import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  Campaign as CampaignsIcon,
  Settings as SettingsIcon,
  Code as ApiIcon,
} from '@mui/icons-material';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/chatbot', label: 'Chatbot', icon: <ChatIcon /> },
  { path: '/orders', label: 'Orders', icon: <OrdersIcon /> },
  { path: '/customers', label: 'Customers', icon: <CustomersIcon /> },
  { path: '/campaigns', label: 'Campaigns', icon: <CampaignsIcon /> },
  { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  { path: '/api', label: 'Developer API', icon: <ApiIcon /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#25D366]">WhatsApp SaaS</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              location.pathname === item.path ? 'bg-gray-100 border-r-4 border-[#25D366]' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 