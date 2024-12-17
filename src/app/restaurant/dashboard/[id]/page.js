"use client";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import RestaurantHeader from "@/app/_components/RestaurnatHeader";

import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";

const EditFoodItem = (props) => {
  const params = React.use(props.params); // Unwrap params
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const[data,setData]=useState(false)

  useEffect(() => {
    handleFoodItem();
  }, []);

  const handleFoodItem = async () => {
    let respone = await fetch(
      "http://localhost:3000/api/restaurant/food/edit/" + params.id
    );
    respone = await respone.json();
    console.log(respone.result, "this is result");

    if (respone.success) {
      setName(respone.result.name);
      setPrice(respone.result.price);
      setPath(respone.result.img_path);
      setDescription(respone.result.description);
    }
  };

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    let response=await fetch("http://localhost:3000/api/restaurant/food/edit/"+params.id,{
      method:"PUT",
      body:JSON.stringify({name,price,path,description})

    })
    response=await response.json()
    if(response.success){
     
      router.push("../dashboard")

    }
    else{
      alert("food item not updated")
    }

  };

  return (
    <>
    <RestaurantHeader/>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update Food Item
        </h1>
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
            onClick={handleEditFoodItem}
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Update Food Item
          </button>
          <button
            onClick={() => router.push("/restaurant/dashboard")}
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Back to dashboard
          </button>
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
};

export default EditFoodItem;
