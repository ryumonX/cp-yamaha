import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <h2 className="text-white text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <a href="#" className="text-gray-300 hover:text-white block">
          Dashboard
        </a>
        <a href="#" className="text-gray-300 hover:text-white block">
          Users
        </a>
        <a href="#" className="text-gray-300 hover:text-white block">
          Settings
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
