'use client'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import RestaurantFooter from '../_components/RestaurantFooter'

function Page() {
    const [cartStorage, setCartStorage] = useState([]);
    
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartStorage(JSON.parse(storedCart));
        }
    },[]);
    
    const removeItem = (index) => {
        const updatedCart = [...cartStorage];
        updatedCart.splice(index, 1);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    
    const calculateTotal = () => {
        return cartStorage.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    return (
        <div className="min-h-screen flex flex-col">
            <CustomerHeader />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
                    
                    {cartStorage.length > 0 ? (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-lg">
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
                                                    Price: <span className="font-medium">${item.price.toFixed(2)}</span>
                                                </p>
                                                <p className="text-gray-600">
                                                    Quantity: <span className="font-medium">{item.quantity}</span>
                                                </p>
                                                <p className="text-gray-600">
                                                    Subtotal: <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
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
                            
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold text-gray-800">Total Amount:</span>
                                    <span className="text-2xl font-bold text-gray-800">${calculateTotal().toFixed(2)}</span>
                                </div>
                                <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-200">
                                    Proceed to Checkout
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