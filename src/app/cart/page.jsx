'use client'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import RestaurantFooter from '../_components/RestaurantFooter'
import { Delivery, Tax } from '../lib/foodTaxDelivery';
import { useRouter } from "next/navigation";

function Page() {
    const [cartStorage, setCartStorage] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
     const router=useRouter()
     
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartStorage(JSON.parse(storedCart));
        }
    },[]);

    useEffect(() => {
        let total = 0;
        cartStorage.map((item) => {
            total = total + item.price;
        });
        setTotalPrice(total);
    }, [cartStorage]);
    
    const removeItem = (index) => {
        const updatedCart = [...cartStorage];
        updatedCart.splice(index, 1);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    const handleOrder=()=>{


        if(JSON.parse(localStorage.getItem("user"))){
        router.push('/order')
        }
        else{
            router.push('/customerregistatoin?order=true')
        }
       
        
    }
    
    const calculateTotal = () => {
        return cartStorage.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <CustomerHeader />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
                    
                    {cartStorage.length > 0 ? (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-lg mb-6">
                                {cartStorage.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
                                    >
                                        <div className="w-32 h-32 flex-shrink-0">
                                            <img
                                                src={item.img_path}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        
                                        <div className="ml-6 flex-grow">
                                            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-gray-600">
                                                    Price: <span className="font-medium">Rs {item.price}</span>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="ml-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex-shrink-0"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Order Summary Section */}
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
                                            <span>Total:</span>
                                            <span>Rs {totalPrice + Tax + Delivery}</span>
                                        </div>
                                    </div>
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