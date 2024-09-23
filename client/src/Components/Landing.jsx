import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Videos/train.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to darken video background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Welcome Text */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          Welcome to eCommerce Website
        </h1>
        {/* Seller Login Link */}
        <Link legacyBehavior href="/seller-login">
          <a className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-64 bg-transparent text-white font-semibold rounded-md hover:bg-yellow-300 hover:text-gray-800 transition-all duration-300 border border-white">
            Seller Login
            <FaArrowRight />
          </a>
        </Link>
        {/* Buyer Login Link */}
        <Link legacyBehavior href="/buyer-login">
          <a className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-64 bg-transparent text-white font-semibold rounded-md hover:bg-yellow-300 hover:text-gray-800 transition-all duration-300 mt-4 border border-white">
            Buyer Login
            <FaArrowRight />
          </a>
        </Link>
      </div>
    </div>
  );
}