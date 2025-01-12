'use client';

import CustomerHeader from '@/app/_components/CustomerHeader';
import RestaurantFooter from '@/app/_components/RestaurantFooter';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const [restaurantDetails, setRestaurantDetails] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = searchParams.get('id');
    try {
      let response = await fetch(`http://localhost:3000/api/customer/${id}`);
      response = await response.json();
      if (response.success) {
        setRestaurantDetails(response.details);
        setFoodItems(response.foodItem);
      }
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  return (
    <>
      <CustomerHeader />

      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-[60vh] w-full relative"
        style={{
          backgroundImage: restaurantDetails.imageUrl
            ? `url(${restaurantDetails.imageUrl})`
            : 'url(https://media.istockphoto.com/id/1394055240/photo/happy-black-female-chef-preparing-food-in-frying-pan-at-restaurant-kitchen.jpg?s=612x612&w=0&k=20&c=6DjpoYqgYVDLmtj3-q7H7wvoiwkVgzi1rn7a_XUZ_Ng=)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {restaurantDetails.name || 'Our Restaurant'}
          </h1>
        </div>
      </div>

      {/* Restaurant Details Section */}
      <main className="p-6">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto hover:scale-105 transform transition duration-300">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to {restaurantDetails.name || 'Our Restaurant'}
          </h1>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium w-24">City:</span>
              <p className="text-lg">{restaurantDetails.city || 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Address:</span>
              <p className="text-lg">{restaurantDetails.address || 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Phone:</span>
              <p className="text-lg">{restaurantDetails.contact || 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Email:</span>
              <p className="text-lg">{restaurantDetails.email || 'N/A'}</p>
            </div>
          </div>
          <p className="mt-6 text-lg">
            Explore our menu and enjoy the best dishes prepared just for you.
          </p>
        </div>
      </main>

      {/* Food Items Section */}
      <section className="p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <div
              key={item.id} // Unique key for each child
              className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <img
                src={item.img_path}
                alt={item.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">{item.descriptoin}</p>
                <p className="text-lg font-medium text-gray-800">
                  Price: Rs:{item.price}
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RestaurantFooter />
    </>
  );
};

export default Page;
