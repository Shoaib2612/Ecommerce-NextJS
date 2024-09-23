import Link from 'next/link';
import "../../Styles/globals.css"
export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("productId");
    localStorage.removeItem("username")
    window.location.href = "/";
  }
  return (
    <nav className="bg-yellow-200 p-4 text-yellow-900 flex justify-between items-center">
      {/* Left side links */}
      <div className="space-x-4">
        <Link  href="/seller-dashboard">
          Home
        </Link>
        <Link href="#" onClick={handleLogout}>
          Logout
        </Link>         
      </div>  
    </nav>
  );
}