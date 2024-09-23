import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditProducts() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch current product data from the backend
  useEffect(() => {
    const fetchProductById = async () => {
      const id = localStorage.getItem('productId'); // Assuming product ID is stored in localStorage
      if(!id){
        setError(`Could not find the product`);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/users/seller/getproductbyid/${id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch product data');
        }

        const data = await response.json();
        const product = data.product;
        setProductName(product.product_name);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
      } catch (err) {
        setError('Failed to fetch product');
      }
    };
    fetchProductById();
  }, []);

  // Handle form change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'productName') setProductName(value);
    if (name === 'category') setCategory(value);
    if (name === 'description') setDescription(value);
    if (name === 'price') setPrice(value);
    if (name === 'discount') setDiscount(value);
  };

  // Handle form submit for updating the product
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId")
    const productId = localStorage.getItem('productId'); // Get product ID from localStorage
    try {
      const response = await fetch(`http://localhost:5000/api/users/seller/updateproduct/${productId}/${userId}`, {
        method: 'PUT', // Use PUT for updating an existing product
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: productName,
          category,
          description,
          price,
          discount,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/seller-dashboard'); // Redirect to seller dashboard after successful update
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
    } catch (err) {
      setError('Failed to update product');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <select
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
          >
            <option value="">Select a category</option>
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="gadgets">Gadgets</option>
          </select>
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="Enter product description"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="discount"
            value={discount}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="Enter discount (if any)"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition-all duration-300"
        >
          Update Product
        </button>

        {success && (
          <p className="mt-4 text-center text-green-500">
            Successfully updated product! Redirecting you to the dashboard...
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
}