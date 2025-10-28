import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Tags,
  List,
  Plus,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react";

const AdminSideBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu - Only on Small Screens */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-md"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`sticky top-0 left-0 z-40 min-h-screen w-64 bg-white border-r border-slate-200 p-6 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Admin Panel</h1>
        

        <ul className="space-y-3">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard/main"
              className={`flex items-center space-x-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard/main")
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Box className="w-5 h-5" /> <span>Dashboard</span>
            </Link>
          </li>

          {/* Products */}
          <li>
            <p className="flex items-center gap-2 text-slate-800 font-semibold mb-1">
              <Box className="w-5 h-5" /> Products
            </p>
            <ul className="ml-5 space-y-1">
              <li>
                <Link
                  to="/dashboard/products/list"
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    isActive("/dashboard/products/list")
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <List className="w-4 h-4" /> <span>Product List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/products/add"
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    isActive("/dashboard/products/add")
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Plus className="w-4 h-4" /> <span>Add Product</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Categories */}
          <li>
            <p className="flex items-center gap-2 text-slate-800 font-semibold mb-1">
              <Tags className="w-5 h-5" /> Categories
            </p>
            <ul className="ml-5 space-y-1">
              <li>
                <Link
                  to="/dashboard/categories/list"
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    isActive("/dashboard/categories/list")
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <List className="w-4 h-4" /> <span>Category List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/categories/add"
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    isActive("/dashboard/categories/add")
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Plus className="w-4 h-4" /> <span>Add Category</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Orders */}
          <li>
            <Link
              to="/dashboard/orders"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard/orders")
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" /> <span>Orders</span>
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link
              to="/dashboard/users"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard/users")
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Users className="w-5 h-5" /> <span>Users</span>
            </Link>
          </li>

          {/* Settings */}
          <li>
            <Link
              to="/dashboard/settings"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard/settings")
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-5 h-5" /> <span>Settings</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Backdrop - Small screens only */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default AdminSideBar;