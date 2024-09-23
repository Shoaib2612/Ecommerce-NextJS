import { useState, useEffect } from 'react';
import Link from 'next/link';
import "../../Styles/globals.css";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const data = event.target.value;
    if (data !== "") {
      // Filter products based on product_name or category
      const filtered = products.filter((product) => {
        const productNameMatch = product.product_name?.toLowerCase().includes(data);
        const productCategoryMatch = product.category?.toLowerCase().includes(data);
        // Return true if either product name or category matches
        return productNameMatch || productCategoryMatch;
      });    
      setFilteredProducts(filtered);
    } else {
      // If input is cleared, show all products again
      setFilteredProducts(products);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.href = "/";
  }
  function formatDescription(description) {
    const maxChars = 60;
    let lines = [];  
    for (let i = 0; i < description.length; i += maxChars) {
      lines.push(description.slice(i, i + maxChars));
    }
    return lines.join("\n");
  }
  function formatUpper(name) {
    const newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName;
  }
  useEffect(() => {
    const fetchProducts = async () => {
      const userId = localStorage.getItem('userId');     
      if (!userId) {
        setError('User ID not found');
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/users/buyer/getmycart/${userId}`, {
          method: 'GET',
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }
        const data = await res.json();
        const product = data.product;
        setProducts(product || []);
        setFilteredProducts(product || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  
  const handleRemoveCart = async(cartId) => {
    const userId = localStorage.getItem("userId");
    try{
      const response = await fetch(`http://localhost:5000/api/users/buyer/removecart/${cartId}`,{
        method : 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if(response.ok){
        alert('Product removed from cart successfully');
        const newProducts = products.filter((product) => product.id !== cartId);
        setProducts(newProducts);
        setFilteredProducts(newProducts);
      }else{
        const errorData = await response.json();
        alert(`Failed to remove the product : ${errorData.message}`);
      }

    }catch(error){
      setError(error);

    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="/Videos/ship.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  
      {/* Overlay to darken video background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
  
      {/* Content */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-2 bg-transparent rounded-lg shadow-lg">
        {/* Header with Hamburger, Search Bar, and Links */}
        <div className="relative flex items-center justify-between w-full mb-2">
          {/* Buyer Dashboard Heading for Larger Screens */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 mb-6 border-b-2 pb-4 border-yellow-400 text-left">
            My Cart
          </h1>
  
          {/* Search Bar for Small Screens */}
          <div className="sm:hidden flex-1 mx-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full text-yellow-300 placeholder-yellow-300 bg-opacity-50 bg-black px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              onChange={handleChange}
            />
          </div>
  
          {/* Hamburger Menu for Small Screens */}
          <div className="sm:hidden ml-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-yellow-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
  
          {/* Links for Larger Screens */}
          <div className="hidden sm:flex w-full justify-end items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="w-70 text-yellow-300 placeholder-yellow-300 bg-opacity-50 bg-black px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              onChange={handleChange}
            />
            <Link
              href="/buyer-dashboard"
              className="text-yellow-300 text-lg sm:text-xl font-semibold hover:bg-black px-4 py-2 rounded transition duration-300"
            >
              Home
            </Link>
           
            <Link
              href="#"
              onClick={handleLogout}
              className="text-yellow-300 text-lg sm:text-xl font-semibold hover:bg-black px-4 py-2 rounded transition duration-300"
            >
              Logout
            </Link>
          </div>
  
          {/* Dropdown Menu for Small Screens */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-black rounded-lg shadow-lg sm:hidden">
              <Link
                href="/buyer-dashboard"
                className="block text-yellow-300 px-4 py-2 hover:bg-gray-800 rounded-t-lg"
                onClick={() => setIsDropdownOpen(false)}
              >
                Home
              </Link>
              
              <Link
                href="#"
                className="block text-yellow-300 px-4 py-2 hover:bg-gray-800 rounded-b-lg"
                onClick={() => {setIsDropdownOpen(false);handleLogout()}}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
  
        {/* Error Message */}
        {error && (
          <p className="text-red-500 bg-red-100 border border-red-400 rounded p-3 mb-4">
            {error}
          </p>
        )}
  
        {/* Products Section */}
        {filteredProducts.length === 0 ? (
          <p className="text-lg text-center text-yellow-300 p-4 rounded-md">
            Cart is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative p-4 sm:p-6 bg-black bg-opacity-70 shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-lg sm:text-xl font-bold text-yellow-300 transition-transform duration-300">
                  {formatUpper(product.product_name)}
                </h2>
                <p className="text-yellow-300 transition-transform duration-300">
                  <span className="font-semibold">Price:</span> ₹{product.price}
                </p>
                <p className="text-yellow-300 transition-transform duration-300">
                  <span className="font-semibold">Discount:</span> {product.discount}%
                </p>
                <p className="text-yellow-300 mt-2 transition-transform duration-300">
                  {formatDescription(product.description)}
                </p>
  
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <Link
                    href="#"
                    onClick={() => handleRemoveCart(product.id)}
                    className="text-yellow-300 hover:text-yellow-600 px-4 py-2 rounded transition duration-300"
                  >
                    Remove from Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

}