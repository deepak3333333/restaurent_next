'use client';





import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaGlobe, 
  FaClock, 
  FaStar, 
  FaShareAlt,
  FaUtensils,
  FaConciergeBell,
  FaRegStar,
  FaDirections,
  FaParking,
  FaWifi
} from 'react-icons/fa';


import React, { useEffect, useState } from 'react';
import CustomerHeader from './_components/CustomerHeader';
import RestaurantFooter from './_components/RestaurantFooter';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants,setRestaurants]=useState([])
  const [spiner,setSpinner]=useState(true)
  const router=useRouter()

  useEffect(() => {
    loadLocation();
    loadRestaurants()
  }, []);

  const loadLocation = async () => {
    let response = await fetch('http://localhost:3000/api/customer/location');
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };
  const loadRestaurants=async(params)=>{
let url="http://localhost:3000/api/customer"
 if(params?.location){
  url=url+"?location="+params.location

 }
else if(params?.restaurant){
  url=url+"?restaurant="+params.restaurant

}



    let response=await fetch(url);
    response=await response.json();
    if(response.success){
      setRestaurants(response.result)
      setSpinner(false)
    }
    

  }

  const handleListItem = (location) => {
    setSelectedLocation(location);
    setShowLocation(false);
    loadLocation({location})
  };

  return (
    <div>
      <CustomerHeader />

      {/* Banner Section */}
      <div className="relative bg-orange-500 min-h-[500px] w-full overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center">
            {/* Left side content */}
            <div className="w-1/2">
              <h1 className="text-white text-5xl font-bold mb-6 leading-tight">
                Order food & groceries. Discover best restaurants.
              </h1>
              <p className="text-white text-xl mb-8">
                Get your favorite meals delivered to your doorstep
              </p>

              {/* Search inputs */}
              <div className="space-y-4 max-w-xl">
                <div className="flex gap-4">
                  <div className="relative w-1/3">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      onClick={() => setShowLocation(true)}
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      placeholder="Select location"
                      className="p-4 pl-12 rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <ul
                      className={`${
                        showLocation
                          ? 'absolute z-10 w-64 bg-white mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto'
                          : 'hidden'
                      }`}
                    >
                      {showLocation &&
                        locations.map((location, index) => (
                          <li
                       
                            key={index}
                            onClick={() => handleListItem(location)}
                            className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-none text-sm"
                          >
                            {location}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search for restaurant"
                      onChange={(event) => loadRestaurants({restaurant:event.target.value})}
                      className="p-4 pl-12 rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service cards */}
          <div className="flex gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-xl font-bold text-gray-800">FOOD DELIVERY</h3>
              <p className="text-gray-600 mt-2">FROM RESTAURANTS</p>
              <p className="text-orange-500 font-semibold mt-4">UPTO 60% OFF</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-xl font-bold text-gray-800">INSTAMART</h3>
              <p className="text-gray-600 mt-2">INSTANT GROCERY</p>
              <p className="text-orange-500 font-semibold mt-4">UPTO 60% OFF</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-xl font-bold text-gray-800">GENIE</h3>
              <p className="text-gray-600 mt-2">PICK-UP & DROP</p>
              <p className="text-orange-500 font-semibold mt-4">FREE DELIVERY</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
      <div   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spiner &&  <div
        className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
        role="status"
        
      ></div>}
        {restaurants.map((restaurant, index) => (
          <div 
            key={index} 
            onClick={()=>router.push('explore/'+restaurant?.name+"?id="+restaurant._id)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                Name:{restaurant.name}
              </h2>
              
              <div className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                <p className="text-lg font-medium mb-2">
                 city: {restaurant.city}
                </p>
                <p className="text-sm">
                 Address: {restaurant.adress}
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium">
                 Contact: {restaurant.contact}
                 emailL:{restaurant.email}
                 id:{restaurant._id}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

      <RestaurantFooter />
    </div>
  );
};

export default Page;
