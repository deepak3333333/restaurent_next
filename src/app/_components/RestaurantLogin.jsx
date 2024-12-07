import React from 'react'

const RestaurantLogin = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Restaurant Login</h1>
      <div className="w-full space-y-4">
        <input 
          type="text" 
          placeholder='enter your email'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <input 
          type="password" 
          placeholder='enter your password'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Login
        </button>
      </div>
    </div>
  )
}

export default RestaurantLogin