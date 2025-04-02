'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSearchParams } from "next/navigation";

const UserLoing = (props) => {
  const searchParams = useSearchParams();
  const order = searchParams.get("order"); // Correct way to access query params
  console.log(order, "this is order");
  

 
 
  
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const router=useRouter()

    const handleSingIN=async()=>{
      let response=await fetch("http://localhost:3000/api/userlogin",{
        method:"POST",
        body:JSON.stringify({email,password}),
      })
      response= await response.json()
      if(response.success){
        if(order){
          
          
          router.push("/cart")


        }
        else{
          router.push("/")
          
          

        }
      const {result}=response
     
      
      delete result.password
      localStorage.setItem("user",JSON.stringify(result))
      router.push("/")
      
      
      }
      else{
        alert("Login failed")
      }
       
        
    }
  return (
    <>

    <div>
    <input 
    onChange={(e)=>setEmail(e.target.value)}
        type="email" 
        placeholder="Email" 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
      onChange={(e)=>setPassword(e.target.value)}
        type="password" 
        placeholder="Password" 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
      onClick={handleSingIN}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
       Login
      </button>
    </div>
    
    </>
  )
}

export default UserLoing
