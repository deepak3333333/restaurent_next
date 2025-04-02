'use client'
import React, { useEffect, useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import RestaurantFooter from '../_components/RestaurantFooter';
import { Delivery, Tax } from '../lib/foodTaxDelivery';
import { useRouter } from "next/navigation";

function Page() {
    const [cartStorage, setCartStorage] = useState([]);
    const [userData, setUserData] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();
    
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const user = localStorage.getItem('user');
        if (storedCart) {
            setCartStorage(JSON.parse(storedCart));
        }
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, []);

    useEffect(() => {
        let total = cartStorage.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        setTotalPrice(total);
    }, [cartStorage]);
    
    const removeItem = (index) => {
        const updatedCart = [...cartStorage];
        updatedCart.splice(index, 1);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    
    const handleOrder =async () => {
        const parsedData = JSON.parse(localStorage.getItem("user"));
        const user = Array.isArray(parsedData) ? parsedData[0] : parsedData;
        let user_id=user._id
        let cart=JSON.parse(localStorage.getItem('cart'))
        let foodItemIds=cart.map((item)=>item._id).toString()
        let resot_id=cart[0].resot_id
        let delivery_id="fdljo3094u"
        let response=await fetch("http://localhost:3000/api/order",{
            method:"POST",
            body:JSON.stringify({user_id,foodItemIds,resot_id,delivery_id,status:"conform",amount:totalPrice}),
           
        })
        response= await response.json()
        if(response.success){
            alert("Order placed successfully")
            localStorage.removeItem('cart')
            router.push('/yourfoodorder')
        }
        else{
            alert("Order failed")
        }

       
        


        
        
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <CustomerHeader />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
                    
                    {userData && Array.isArray(userData) && userData.length > 0 && (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">User Details</h2>
        {userData.map((user, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-none">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>City:</strong> {user.city}</p>
            </div>
        ))}
    </div>
)}


                    {cartStorage.length > 0 ? (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Food Charges:</span>
                                        <span className="font-medium">Rs {totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Charges:</span>
                                        <span className="font-medium">Rs {Delivery}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax:</span>
                                        <span className="font-medium">Rs {Tax}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex justify-between text-lg font-semibold text-gray-800">
                                           
                                           
                                        </div>
                                    </div>
                                </div>
                               
                                  <div>
                                  <h1>Payment Method :</h1>
                                  <p>cashon Delivery : <span>Rs {totalPrice + Tax + Delivery}</span></p>

                                  </div>
                                 
                                <button 
                                    onClick={handleOrder}
                                    className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Order Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                            <p className="text-xl text-gray-500">Your cart is empty.</p>
                            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </main>
            
            <RestaurantFooter />
        </div>
    );
}

export default Page;
