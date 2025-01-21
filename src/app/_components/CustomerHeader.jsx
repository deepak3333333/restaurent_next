'use client';
import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';

const CustomerHeader = (props) => {
  // Initialize cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load initial cart data when component mounts
  useEffect(() => {
    // Get cart data from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      // If cart exists in localStorage, parse and set it
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.length);
    } else {
      // If no cart exists, initialize with empty array
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      setCartCount(0);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Handle cart updates when new items are added
  useEffect(() => {
    // Only proceed if we have new cart data from props
    if (props.cartData) {
      // Check if cart is empty
      if (cartItems.length === 0) {
        // If cart is empty, simply add the new item
        const updatedCart = [props.cartData];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setCartCount(1);
      } else {
        // Check if new item is from the same restaurant
        if (cartItems[0].resto_id !== props.cartData.resto_id) {
          // If different restaurant, show alert and replace cart
          alert("You can't add items from different restaurants. Your cart will be cleared and new item will be added.");
          const updatedCart = [props.cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItems(updatedCart);
          setCartCount(1);
        } else {
          // Same restaurant, add to existing cart
          const updatedCart = [...cartItems, props.cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItems(updatedCart);
          setCartCount(updatedCart.length);
        }
      }
    }
  }, [props.cartData]); // Run when props.cartData changes

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
              <span className="font-medium">Login/SignUp</span>
            </Link>
            
            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors relative"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span className="font-medium">Cart ({cartCount})</span>
            </Link>
            
            <Link 
              href="/restaurant" 
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaPlusCircle className="h-5 w-5" />
              <span className="font-medium">Partner with us</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;