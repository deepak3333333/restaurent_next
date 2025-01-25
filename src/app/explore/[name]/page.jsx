'use client';

import CustomerHeader from '@/app/_components/CustomerHeader';
import RestaurantFooter from '@/app/_components/RestaurantFooter';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const [restaurantDetails, setRestaurantDetails] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const searchParams = useSearchParams();
  const [cartData,setCartData]=useState()
  const [cartStorage,setCartStorage]=useState(JSON.parse(localStorage.getItem('cart')) || [])
  //this state for storing the cart data from localstorage
  const [cartIds, setCartIds] = useState(cartStorage.map((item) => item._id));
  //this state for storing the ids of cartStorage food

  const [removeCartData,setRemoveCartData]=useState()
 
  
  
 
  

  useEffect(() => {
    loadRestaurantDetails();
  }, []);



  const addToCart=(item)=>{
    setCartData(item)
    // console.log("this is cart data added ",cartData);
let localcartIds=cartIds
    localcartIds.push(item._id)
    setCartIds(localcartIds)
    


  }
  const removeFromCart=(id)=>{
   setRemoveCartData(id)
   //it filter the id from cartIds and store it in localIds
   let localIds=cartIds.filter((item)=>item!==id)
   setCartIds(localIds)
   

    
    
  }

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
      <CustomerHeader cartData={cartData} removeCartData={removeCartData}/>

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
          {foodItems.map((item, index) => (
            <div
              key={item._id || item.id || `food-item-${index}`}
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
               {
                cartIds.includes(item._id) ?



                <button


                  onClick={()=>removeFromCart(item._id)}


                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300 flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span>Remove from cart</span>
                
                
                
                </button>:
                <button 
                onClick={()=>addToCart(item)}
                
                
                
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300 flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
               }
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