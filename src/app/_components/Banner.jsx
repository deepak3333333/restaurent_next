'use client'
import React, { useEffect, useState } from 'react';

import { FiMapPin, FiSearch } from 'react-icons/fi';

const Banner = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showlocation,setShowlocation]=useState(false)

useEffect(()=>{
  loadLocation()

  },[])

  const loadLocation = async() => {
    let respone=await fetch("http://localhost:3000/api/customer/location")
    respone=await respone.json()
    if(respone.success){
      setLocations(respone.result)
     
      
    }
    
  }
  const handleListItem=(location)=>{
    setSelectedLocation(location)
   setShowlocation(false)

  }

return (
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
           {/* Search inputs */}
<div className="space-y-4 max-w-xl">
  <div className="flex gap-4">
    <div className="relative w-1/3">
      <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text" 
        onClick={() => setShowlocation(true)}
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        placeholder="Select location" 
        className="p-4 pl-12 rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <ul className={`${showlocation ? 'absolute z-10 w-64 bg-white mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto' : 'hidden'}`}>
        {showlocation && locations.map((location, index) => (
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
        placeholder="Search for restaurant or food" 
        className="p-4 pl-12 rounded-lg border border-gray-300 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
    </div>
  </div>
</div>
          </div>

          {/* Right side - could add an image here */}
         
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
  );
};

export default Banner;
