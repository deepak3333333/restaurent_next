"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function FoodItemList() {
  const [foodItems, setFoodItems] = useState();
  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restarurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const resto_id = restarurantData._id;
    let response = await fetch(
      "http://localhost:3000/api/restaurant/food/" + resto_id
    );
    response = await response.json();
    if (response.success) {
      setFoodItems(response.result);
    } else {
      alert("Error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Food Item List
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="px-4 py-2 border border-gray-300">S.No</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Image</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodItems &&
              foodItems.map((item, key) => (
                <tr
                  key={key}
                  className="hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                >
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {key + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {item.price}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <img
                      src={item.img_paht}
                      className="h-16 w-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 flex items-center gap-2 hover:bg-blue-600 transition duration-200">
                      <FaEdit /> Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-red-600 transition duration-200">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodItemList;
