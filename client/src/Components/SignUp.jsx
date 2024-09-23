import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UserSignUp() {
  // State to hold the user role selection
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 'seller',
  });
  const { username, email, password, confirmPassword, role } = formData;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State to handle success
  const [countdown, setCountdown] = useState(3); // Countdown in seconds

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.errors
          ? errorData.errors.map((err) => err.msg).join(',')
          : 'Something went wrong');
        throw new Error(`${
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
      setError(`${err}`);
    }
  }

  useEffect(() => {
    let timer;
    if (success) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            window.location.href = '/'; // Redirect to home page
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Clear interval on component unmount
  }, [success]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: 'url("/Images/login.jpg")' }}>
      {/* Home Button */}
      <Link legacyBehavior href="/">
        <a className="absolute top-4 left-4 px-4 py-2 bg-yellow-200 text-gray-800 font-semibold rounded-md hover:bg-yellow-300 transition-all duration-300">
          Home
        </a>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <div className="bg-white bg-opacity-40 p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-700 bg-transparent focus:outline-none focus:border-yellow-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              id="email"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none bg-transparent focus:border-yellow-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Role Drop-down */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-2">
              Sign up as:
            </label>
            <select
              id="role"
              name="role"
              value={role}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none bg-transparent focus:border-yellow-400"
            >
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none bg-transparent focus:border-yellow-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none bg-transparent focus:border-yellow-400"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-transparent text-black font-bold py-2 px-4 rounded-md border border-black hover:bg-yellow-300 hover:text-white transition-all duration-300"
          >
            Sign Up
          </button>

          {/* Acknowledgment Message */}
          {success && (
            <div className="mt-4 text-center text-green-500">
              <p>You have successfully registered. Redirecting to home page in {countdown} seconds...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}