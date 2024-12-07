"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const RestaurantHeader = () => {
  const [details, setDetails] = useState("");
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data ) {
      router.push("/restaurant");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);
  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/6978/6978255.png"
              alt="Restaurant Logo"
            />
          </div>
          <div>
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </Link>
              </li>
              {details ? (
                <>
                  <li>
                    <Link
                      href=""
                      className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      Profile
                    </Link>
                  </li>
                  <button onClick={logout}>logout</button>
                </>
              ) : (
                <li>
                  <Link
                    href="/restaurant"
                    className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Login/SignUp
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RestaurantHeader;
