'use client'
import AddFoodItem from '@/app/_components/AddFoodItem'
import RestaurantFooter from '@/app/_components/RestaurantFooter';
import RestaurantHeader from '@/app/_components/RestaurnatHeader'
import React, { useState } from 'react'




const Page = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <RestaurantHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setAddItem(true)}
            className={`py-2 px-4 font-bold rounded-lg ${
              addItem
                ? "bg-orange-600 text-white"
                : "bg-white border border-orange-600 text-orange-600"
            } hover:bg-orange-700 hover:text-white transition duration-200`}
          >
            Add Food Item
          </button>
          <button
            onClick={() => setAddItem(false)}
            className={`py-2 px-4 font-bold rounded-lg ${
              !addItem
                ? "bg-orange-600 text-white"
                : "bg-white border border-orange-600 text-orange-600"
            } hover:bg-orange-700 hover:text-white transition duration-200`}
          >
            Dashboard
          </button>
        </div>

        <div className="mt-6">{addItem && <AddFoodItem />}</div>
      </div>
      <RestaurantFooter/>
    </div>
  );
};

export default Page;
