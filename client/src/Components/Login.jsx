import { useState, useEffect } from 'react';
import Link from 'next/link';
import "../Styles/globals.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://ecommerce-nextjs-server.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error
          ? errorData.error.map((err) => err.msg).join(',')
          : 'Something went wrong');
        throw new Error(`${
            errorData.errors
              ? errorData.errors.map((err) => err.msg).join(',')
              : 'Something went wrong'
          }`);
      }
      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }
      const role = data.role;
      const id = data.id;
      const name = data.username;
      localStorage.setItem('userId', id);
      localStorage.setItem('username', name);
      setSuccess(true);
      setError('');  
      if (role === 'seller') {
        window.location.href = '/seller-dashboard';
      }
      if(role === 'buyer'){
        window.location.href = '/buyer-dashboard';
      }
    } catch (err) {
      setSuccess(false);
      setError(`${err}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: 'url("/Images/login.jpg")' }}>
      {/* Home Button */}
      <Link legacyBehavior href="/">
        <a className="absolute top-4 left-4 px-4 py-2 bg-yellow-200 text-gray-800 font-semibold rounded-md hover:bg-yellow-300 transition-all duration-300">
          Home
        </a>
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Login</h1>
      <div className="bg-white bg-opacity-40 p-6 rounded-lg shadow-lg w-full max-w-md backdrop-blur-md">
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-black mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-black placeholder-black bg-transparent focus:outline-none focus:border-yellow-400"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-black mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-black placeholder-black bg-transparent focus:outline-none focus:border-yellow-400"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-transparent text-black font-bold py-2 px-4 rounded-md border border-black hover:bg-yellow-300 hover:text-white transition-all duration-300"
          >
            Login
          </button>
        </form>
        {/* Display Error */}
        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
        {/* Display Success */}
        {success && (
          <p className="mt-4 text-center text-green-400">
            Login successful! Redirecting you to the dashboard...
          </p>
        )}
        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <Link legacyBehavior href="/sign-up">
            <a className="text-black-500 hover:underline">Sign up</a>
          </Link>
        </div>
      </div>
    </div>
  );
}