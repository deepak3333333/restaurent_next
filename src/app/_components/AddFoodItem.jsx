'use client'
import React, { useState } from "react";

const AddFoodItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleaddFoodItem = async() => {
    if(!name || !price || !path || !description){

      setError(true);
      return
     
    }
    else{
      setError(false);
    }

    console.log(name, path, price, description);
    let resto_id;
    const restaurantData=localStorage.getItem("restaurantUser")
    if(restaurantData){
      const restaurant=JSON.parse(restaurantData)
      resto_id=restaurant._id
      
    }

   let response=  await fetch("http://localhost:3000/api/restaurant/food",{
      method:"POST",
      body:JSON.stringify({
        name,price,img_path:path,description,resto_id
        
      })
    })
    response=await response.json()
    if(response.success){
     alert("fodd item added")
      
    }
    

  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add Food Item</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter name of food"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
       
        <input
          type="text"
          placeholder="Enter price of food"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        
        <input
          type="text"
          placeholder="Enter image path"
          value={path}
          onChange={(event) => setPath(event.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        
        <textarea
          placeholder="Enter food description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows="4"
          
        />
         {error && <p className="text-red-500">Please fill the all fields</p>}
        <button
          onClick={handleaddFoodItem}
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Add Food Item
        </button>
      </div>
    </div>
  );
};

export default AddFoodItem;
