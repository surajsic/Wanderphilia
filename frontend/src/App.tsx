import { Navigate, Route, Routes } from "react-router-dom"
import Layout  from "./layout/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import { useAppContext } from "./contexts/AppContext"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import Detail from "./pages/Detail"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"
import Home from "./pages/Home"
import PaymentSuccess from "./pages/PaymentSuccess"
import PaymentFailure from "./pages/PaymentFailure"

function App() {

  const { isLoggedIn } = useAppContext();


  return (
  
    
    <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><Search /> </Layout>} />
          <Route path="/detail/:hotelId" element={<Layout><Detail /> </Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout> } />
          <Route path="/sign-in" element={<Layout><SignIn /></Layout> } />
          {isLoggedIn && (<>
            <Route path="/hotel/:hotelId/booking" element={<Layout><Booking /></Layout>} />
          <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} />
          <Route path="/my-hotels" element={<Layout><MyHotels /></Layout>} />
          <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel /></Layout>} />
          <Route path="/my-bookings" element={<Layout><MyBookings /></Layout>} />
          <Route path="/success" element={<Layout><PaymentSuccess /></Layout>} />
          <Route path="/failure" element={<Layout><PaymentFailure /></Layout>} />
          </>)} 
          <Route path="*" element={<Navigate to="/" />} />
          </Routes>

  
  )
}

export default App
