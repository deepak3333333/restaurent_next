'use client'
import { useRouter } from "next/navigation";
import React, { useState } from 'react'



const RestaurantSignUp = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [cPassword,setc_password]=useState("")
  const [name,setName]=useState("")
  const [city,setCity]=useState("")
  const [address,setAddress]=useState("")
  const [contact,setContact]=useState("")
  const router=useRouter();


  const handleSignup=async()=>{
    console.log(email,password,cPassword,name,city,address,contact);
    let response= await fetch("http://localhost:3000/api/restaurant",{
      method:"POST",
      body:JSON.stringify({email,password,name,city,address,contact}),
    })

    response=await response.json()

    if(response.success){
      const {result}=response
      delete result.password
      localStorage.setItem("restaurantUser",JSON.stringify(result))
      router.push("/restaurant/dashboard")

    }

    
  }



  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Restaurant SignUp</h1>
      <div className="w-full space-y-4">
        <input 
          type="text" 
          placeholder='enter email id'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
         value={email}
          onChange={(event)=>setEmail(event.target.value)}
        />
        <input 
          type="password" 
          placeholder='enter password'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={password}
          onChange={(event)=>setPassword(event.target.value)}
        />
        <input 
          type="password" 
          placeholder='enter conform password'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={cPassword}
          onChange={(event)=>setc_password(event.target.value)}
        />
        <input 
          type="text" 
          placeholder='enter restaurant name'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={name}
          onChange={(event)=>setName(event.target.value)}
        />
        <input 
          type="text" 
          placeholder='enter  city'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={city}
          onChange={(event)=>setCity(event.target.value)}
        />
        <input 
          type="text" 
          placeholder='enter your full address'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={address}
          onChange={(event)=>setAddress(event.target.value)}
        />
        <input 
          type="text" 
          placeholder='enter your contact number'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={contact}
          onChange={(event)=>setContact(event.target.value)}
        />
        <button  onClick={handleSignup} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          SignUp
        </button>
      </div>
    </div>
  )
}

export default RestaurantSignUp