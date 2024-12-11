import React from 'react';

const RestaurantFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              Welcome to our restaurant! We serve fresh, delicious meals made
              with love. Come visit us for an unforgettable dining experience.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline hover:text-orange-500">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  className="hover:underline hover:text-orange-500"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:underline hover:text-orange-500"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline hover:text-orange-500"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 Food Street, Flavor Town</li>
              <li>📞 +1 (123) 456-7890</li>
              <li>✉️ support@restaurant.com</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500"
              >
                <i className="fab fa-facebook-f text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500"
              >
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500"
              >
                <i className="fab fa-instagram text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500"
              >
                <i className="fab fa-youtube text-white"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Restaurant. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;
