import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"

const UserLayout = () => {
  return (
    <>
     <Navbar />
      <Outlet />
     <Footer />
    </>
  )
}

export default UserLayout