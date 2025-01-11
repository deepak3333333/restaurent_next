import React from 'react';
import { FaHome, FaUser, FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';

const CustomerHeader = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="relative h-10 w-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6978/6978255.png"
              alt="Restaurant Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaHome className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaUser className="h-5 w-5" />
              <span className="font-medium">Login/SingUP</span>
            </Link>
            
            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span className="font-medium">Cart</span>
            </Link>
            
            <Link 
              href="/restaurant" 
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaPlusCircle className="h-5 w-5" />
              <span className="font-medium">Patner with us</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;