"use client";
import React, { useEffect, useState } from "react";
import { FaHome, FaUser, FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";


const CustomerHeader = (props) => {
  //this state for the totla number of food  into cart
  const [cartCount, setCartCount] = useState(0);
  //this state for  storing the foods into the state
  const [cartItems, setCartItems] = useState([]);
  const[userData,setUserData]=useState('');
  
  
  const router=useRouter()
  useEffect(() => {
    try {
      const data = localStorage.getItem("user");
      if (data) {
        const parsedData = JSON.parse(data);
        // Handle both array and object formats
        const userData = Array.isArray(parsedData) ? parsedData[0] : parsedData;
        console.log("Parsed user data:", userData); // Debug log
        setUserData(userData);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);
  const hadleLogout=()=>{

    localStorage.removeItem("user")
    router.push("/customerregistatoin")
    
    
  }

  //load initial cart data when component mouts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.length);
    } else {
      //if not cart exits intiliaed with empty array
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      setCartCount(0);
    }
  }, []);
  //empty dependency array means this useEffect will run only once when component mounts
useEffect(()=>{


  if(props.removeCartData){
    let localCartItem=cartItems.filter((item)=>{
      return item._id!=props.removeCartData
    })

    setCartItems(localCartItem)
    setCartCount(cartCount-1)
    localStorage.setItem("cart", JSON.stringify(localCartItem));

    
  }

},[props.removeCartData])
  //when user add food to cart
  useEffect(() => {
    if (props.cartData) {
      //only procced if we have new cart data from props.cartData

      if (cartItems.length === 0) {
        //if cart is empty ,simple add new item
        const updatedCart = [props.cartData];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setCartCount(1);
      } else {
        if (cartItems[0].resto_id !== props.cartData.resto_id) {
          alert(
            "you can not add food from different restaurant your cart will be cleared and new item will be added"
          );
          const updatedCart = [props.cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItems(updatedCart);
          setCartCount(1);
        } else {
          const updatedCart = [...cartItems, props.cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItems(updatedCart);
          setCartCount(updatedCart.length);
        }
      }
    }
  }, [props.cartData]);

  //runs when props.cartData changes

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="relative h-10 w-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6978/6978255.png"
              alt="Restaurant Logo"
              className="h-10 w-10 object-contain"
            />
          </div>

          <nav className="flex items-center space-x-6">


          {userData && (
  <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center animate-fadeIn hover:scale-105 transition-transform duration-300 cursor-pointer">
    {userData && userData.name && (
  <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center animate-fadeIn hover:scale-105 transition-transform duration-300 cursor-pointer">
   {userData && userData.name && (
  <h1> Welcome:{userData.name}</h1>
)}
  </h1>
)}
  </h1>
)}
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaHome className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>

          

            {userData?
            <>
            <button onClick={hadleLogout}>
              Logout
            </button>
            
            </>:
            <>
            
            <Link
              href="/customerregistatoin"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaUser className="h-5 w-5" />
              <span className="font-medium">Login/SignUp</span>
            </Link>
            
            </>}

            <Link
              href={cartCount?"/cart":"#"}
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors relative"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span className="font-medium">Cart </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/restaurant"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-500 transition-colors"
            >
              <FaPlusCircle className="h-5 w-5" />
              <span className="font-medium">Partner with us</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
