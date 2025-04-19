import React, { useState } from 'react';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <NotificationsIcon />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-2 hover:bg-gray-50 rounded">
                    <p className="text-sm">New order received from Customer #1234</p>
                    <span className="text-xs text-gray-500">2 minutes ago</span>
                  </div>
                  <div className="p-2 hover:bg-gray-50 rounded">
                    <p className="text-sm">Campaign "Summer Sale" completed</p>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
            >
              <AccountCircleIcon />
              <span>John Doe</span>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
                  Settings
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-red-500">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 