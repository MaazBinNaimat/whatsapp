import React from 'react';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const KPIBox = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          {icon}
        </div>
        <div className="flex items-center">
          {isPositive ? (
            <TrendingUp className="text-green-500 mr-1" />
          ) : (
            <TrendingDown className="text-red-500 mr-1" />
          )}
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <h3 className="text-gray-500 text-sm mt-4">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
};

export default KPIBox; 