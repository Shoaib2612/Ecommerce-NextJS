import { useEffect, useState } from 'react';
import "../../Styles/globals.css"

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    discount: '',
  });
  const { productName, category, description, price, discount } = formData;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State to handle success
  const [countdown, setCountdown] = useState(3); // Countdown in seconds

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`http://localhost:5000/api/users/seller/addProducts/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error: ${
          errorData.errors
            ? errorData.errors.map((err) => err.msg).join(',')
            : 'Something went wrong'
        }`);
      }
      const data = await res.json();
      setError('');
      setSuccess(true); // Set success to true
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  useEffect(() => {
    let timer;
    if (success) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            window.location.href = '/seller-dashboard'; // Redirect to home page
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Clear interval on component unmount
  }, [success]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">Add Products</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="productName" // Add name attribute
            value={productName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-4">
          <select
            name="category" // Add name attribute
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
            name="description" // Add name attribute
            value={description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="Enter product description"
            maxLength={100}
            rows={description.length > 50 ? 2 : 1} // Adjust row based on length
            style={{
              whiteSpace: "pre-wrap", // Wrap text properly
              wordWrap: "break-word", // Break words if necessary
            }}
            
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="price" // Add name attribute
            value={price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-yellow-400"
            placeholder="Enter product price"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="discount" // Add name attribute
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
          Add Product
        </button>
        {success && (
          <p className="mt-4 text-center text-green-500">
            Successfully added new product!!. Redirecting you to the dashboard...
          </p>
        )}
        {/* Display Error */}
        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
}