'use client'
import React, { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import RestaurantFooter from '../_components/RestaurantFooter'
import UserSignup from '../_components/UserSignup'
import UserLoing from '../_components/UserLoing'


const page = () => {
    const [login,setLogin]=useState(true)
  return (

    
<>
<div>
    <CustomerHeader/>
</div>
<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {login?<UserLoing/>:<UserSignup/>}
        <div className="mt-4 text-center">
          <button 
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            onClick={()=>setLogin(!login)}
          >
            {login?"Do not have an accoutn?Signup":"Already have an account?Login"}
          </button>
        </div>
      </div>
    </div>

<div>
    <RestaurantFooter/>
</div>
</>
   
  )
}

export default page
