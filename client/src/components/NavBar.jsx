import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../pages/Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const[search,setSearch] = useState("")

  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/shop/?search=${search}`) // http://localhost:5173/shop/?search=seacrh_value
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo + Search */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              ShopEase
            </Link>

            {/* Search Bar (hidden on mobile) */}
            <div className="hidden md:flex items-center border border-slate-200 rounded-md px-2">
              <Search onClick={handleSearch} className="h-5 w-5 text-slate-500 mr-2" />
              <input
                onChange={e => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="focus:outline-none text-slate-700 placeholder-slate-400 border-none"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-slate-700 hover:text-slate-900">
              Home
            </Link>
            <Link to="/shop" className="text-slate-700 hover:text-slate-900">
              Shop
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-slate-900">
              About
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-slate-900">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
           <Link to='/login'>
              <button className="btn btn-ghost">Login</button>
           </Link>

            <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link>

            {/* Cart */}
             <Cart />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-700 hover:text-slate-900 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <a href="/" className="block text-slate-700 hover:text-slate-900">
            Home
          </a>
          <a href="/shop" className="block text-slate-700 hover:text-slate-900">
            Shop
          </a>
          <a href="/about" className="block text-slate-700 hover:text-slate-900">
            About
          </a>
          <a href="/contact" className="block text-slate-700 hover:text-slate-900">
            Contact
          </a>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button className="btn btn-ghost w-full">Login</button>
            <button className="btn btn-primary w-full">Register</button>
          </div>

          {/* Mobile Search */}
          <div className="mt-2 flex items-center border border-slate-300 rounded-full px-3 py-1.5 bg-slate-50">
            <Search className="h-5 w-5 text-slate-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-slate-50 focus:outline-none text-slate-700 placeholder-slate-400 w-full"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;