'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



const RestaurantLogin = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error1,setError1]=useState(false)
  const router=useRouter()


  const handlelogin=async()=>{
    



    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email,password,login:true}),
    });
    response= await response.json();
    if(response.success){
      const {result}=response
      delete result.password
      localStorage.setItem("restaurantUser",JSON.stringify(result))
      router.push("/restaurant/dashboard");
    
    }
    else{
      alert("login faield")
    }
    
}


  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Restaurant Login</h1>
      <div className="w-full space-y-4">
        <input 
          type="text" 
          placeholder='enter your email'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        
        />
        {error1 && <p className="text-red-500">Please fill all the fields</p>}
        <input 
          type="password" 
          placeholder='enter your password'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
       value={password}
          onChange={(e)=>setPassword(e.target.value)}
       
       />
        {error1 && <p className="text-red-500">Please fill all the fields</p>}

        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors" onClick={handlelogin}>
          Login
        </button>
      </div>
    </div>
  )
}

export default RestaurantLogin