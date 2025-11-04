import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Login from "./pages/Login";
import Regsiter from "./pages/Regsiter";
import UserLayout from "./utils/UserLayout";
import AdminLayout from "./utils/AdminLayout";
import Main from "./pages/adminpages/Main";
import ProductList from "./pages/adminpages/ProductList";
import AddProductForm from "./pages/adminpages/AddProductForm";
import CategoryList from "./pages/adminpages/CategoryList";
import AddCatgeoryForm from "./pages/adminpages/AddCatgeoryForm";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import UpdateCategoryForm from "./pages/adminpages/UpdateCategoryForm";
import UpdateProductForm from "./pages/adminpages/UpdateProductForm";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regsiter />} />
        </Route>

        {/* admin layout */}
        <Route element={<AdminLayout />}>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard/main" element={<Main />} />
            <Route path="/dashboard/products/list" element={<ProductList />} />
            <Route
              path="/dashboard/products/add"
              element={<AddProductForm />}
            />
            <Route
              path="/dashboard/categories/list"
              element={<CategoryList />}
            />
            <Route
              path="/dashboard/categories/add"
              element={<AddCatgeoryForm />}
            />
            <Route path="/dashboard/categories/update" element={<UpdateCategoryForm />} />
            <Route path="/dashboard/products/update" element={<UpdateProductForm />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
