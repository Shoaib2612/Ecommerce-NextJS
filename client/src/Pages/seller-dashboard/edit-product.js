import EditProducts from "@/Components/Seller/EditProducts"
import Navbar from "@/Components/Seller/Navbar"
export default function SellerDashboard() {    
    return <>    
      <div className="p-6">
        <Navbar />
        <EditProducts />
      </div>
    </>    
}