import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const UserSignup = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [address,setAddress]=useState('')
    const [city,setCity]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const router=useRouter()
    




    


    const handleSignup=async()=>{
       console.log(name,email,password,confirmPassword,address,city,phoneNumber)
       let response=await fetch("http://localhost:3000/api/usersregisation",{
        method:"POST",
        body:JSON.stringify({name,email,password,address,city,phoneNumber}),
       })
        response=await response.json()
        if(response.success){
            alert("User created successfully")
            const {result}=response
            delete result.password
            localStorage.setItem("user",JSON.stringify(result))
            router.push("/")
            
        }
        else{
            alert("User creation failed")
        }
        
    }
  return (
    <>
    <div>
     <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} className="border-2 border-gray-300 p-2 w-full my-2"/>
        <input type="email" placeholder="Enter your email"  value={email} onChange={(e)=>setEmail(e.target.value)} className="border-2 border-gray-300 p-2 w-full my-2"/>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border-2 border-gray-300 p-2 w-full my-2"/>
        <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="border-2 border-gray-300 p-2 w-full my-2"/>
       
        <input type="text" placeholder="Enter your address" value={address} onChange={(e)=>setAddress(e.target.value)} className="border-2 border-gray-300 p-2 w-full my-2"/>
        <input type="text" placeholder="Enter your city" value={city} onChange={(e)=>setCity(e.target.value)} className="border-2 border-gray-300 p-2 w-full my-2"/>
        <input type="text" placeholder='Enter your phone number' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} className="border-2 border-gray-300 p-2 w-full my-2"/>
    </div>
    <div>
        <button  onClick={handleSignup}   className="bg-blue-500 text-white p-2 rounded-lg w-full my-2">Signup</button>
    </div>
    </>
  )
}

export default UserSignup
