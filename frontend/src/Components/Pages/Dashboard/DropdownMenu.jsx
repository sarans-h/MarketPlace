import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        Menu
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-10">
          <Link to="/admin/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</Link>
          <Link to="/admin/products" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Products</Link>
          <Link to="/admin/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</Link>
          <Link to="/admin/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Users</Link>
          <Link to="/admin/reviews" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Reviews</Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
