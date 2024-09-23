import Navbar from "@/Components/Seller/Navbar";
import AddProducts from "@/Components/Seller/AddProducts"
export default function SellerDashboard() {
    return <>   
      <div className="p-6">
        <Navbar />
        <AddProducts />
      </div>
    </>    
}