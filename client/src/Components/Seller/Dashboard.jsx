import { useState, useEffect } from 'react';
import Link from 'next/link';
import "../../Styles/globals.css";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [name, setName] = useState('');
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
  function formatDescription(description) {
    const maxChars = 60;
    let lines = []; 
    for (let i = 0; i < description.length; i += maxChars) {
      lines.push(description.slice(i, i + maxChars));
    }
    return lines.join("\n");
  }
  useEffect(() => {
    const fetchProducts = async () => {
      const userId = localStorage.getItem('userId');
      setName(localStorage.getItem("username"));
      if (!userId) {
        setError('You have to login.');
        return;
      }
      try {
        const res = await fetch(`http://test2-env.eba-g2w5pezx.ap-south-1.elasticbeanstalk.com/api/users/seller/getProducts/${userId}`, {
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

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("productId");
    localStorage.removeItem("username")
    window.location.href = "/";
  }

  const handleEdit = (productId) => {
    localStorage.setItem("productId",productId);
  };

  const handleDelete = async(productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if(!confirmed)return;
    try{
      const response = await fetch(`http://test2-env.eba-g2w5pezx.ap-south-1.elasticbeanstalk.com/api/users/seller/deleteproduct/${productId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if(response.ok){
        alert('Product deleted successfully');
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
        setFilteredProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
      }else{
        const errorData = await response.json();
        alert(`Failed to delete the product : ${errorData.message}`);
      }
    }catch(error){
      alert("An error occured while deleting the product.");
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Videos/ship.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  
      {/* Overlay to darken video background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
  
      {/* Content */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-2 bg-transparent rounded-lg shadow-lg">
        {/* Links container for large screens */}
        <div className="hidden sm:flex absolute top-4 right-4 space-x-4">
        <input
              type="text"
              placeholder="Search"
              className="w-70 h-9 text-yellow-300 placeholder-yellow-300 bg-opacity-50 bg-black px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              onChange={handleChange}
            />
         
          <Link
            href="/seller-dashboard/add-products"
            className="text-yellow-300 text-lg sm:text-xl font-semibold hover:bg-black px-4 py-2 rounded transition duration-300"
          >
            Add Products
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
        <div className="relative flex items-center justify-end w-full sm:hidden">
          {/* Hamburger Icon for Small Screens (Right aligned) */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-yellow-300 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        
        {/* Dropdown Links for Small Screens (Right aligned) */}
        {isDropdownOpen && (
          <div className="absolute top-12 right-4 bg-black bg-opacity-90 rounded-lg shadow-lg p-4 space-y-2 z-20 sm:hidden">
             {/* Search Bar for Small Screens */}
             <div className="sm:hidden flex-1 justify-between mx-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full text-yellow-300 placeholder-yellow-300 bg-opacity-50 bg-black px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              onChange={handleChange}
            />
          </div>
            
            <Link
              href="/seller-dashboard/add-products"
              className="block text-yellow-300 text-lg font-semibold px-4 py-2 hover:bg-gray-800 rounded-lg"
              onClick={() => setIsDropdownOpen(false)}
            >
              Add Products
            </Link>
            <Link
              href="#"
              className="block text-yellow-300 text-lg font-semibold px-4 py-2 hover:bg-gray-800 rounded-lg"
              onClick={() => {setIsDropdownOpen(false);handleLogout()}}
            >
              Logout
            </Link>
          </div>
        )}
  
        <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 mb-6 border-b-2 pb-4 border-yellow-400 text-left">
          Welcome {name}
        </h1>
  
        {error && (
          <p className="text-red-500 bg-red-100 border border-red-400 rounded p-3 mb-4">
            {error}
          </p>
        )}
  
        {filteredProducts.length === 0 ? (
          <p className="text-lg text-center text-yellow-300 p-4 rounded-md">
            No products available. Start adding your products!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative p-4 sm:p-6 bg-black bg-opacity-70 shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-lg sm:text-xl font-bold text-yellow-300 transition-transform duration-300">
                  {product.product_name ? product.product_name[0].toUpperCase() + product.product_name.slice(1): "Product name not provided"}
                </h2>
                <p className="text-yellow-300 transition-transform duration-300">
                  <span className="font-semibold">Category:</span> {product.category ? product.category : "Product Category not mentioned"}
                </p>
                <p className="text-yellow-300 transition-transform duration-300">
                  <span className="font-semibold">Price:</span> ₹{product.price ? product.price : "Price not mentioned"}
                </p>
                <p className="text-yellow-300 transition-transform duration-300">
                  <span className="font-semibold">Discount:</span> {product.discount ? product.discount : "Discount not mentioned"}%
                </p>
                <p className="text-yellow-300 mt-2 transition-transform duration-300">
                  {product.description ? formatDescription(product.description[0]?.toUpperCase() + product.description.slice(1)) : "Description Not Provided"}
                </p>
  
                {/* Edit and Delete links */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <Link
                    href={`/seller-dashboard/edit-product`}
                    onClick={() => handleEdit(product.id)}
                    className="text-yellow-300 hover:text-yellow-600 px-4 py-2 rounded transition duration-300"
                  >
                    Edit
                  </Link>
                  <Link
                    href="#"
                    onClick={() => handleDelete(product.id)}
                    className="text-yellow-300 hover:text-yellow-600 px-4 py-2 rounded transition duration-300"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};