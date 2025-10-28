import { Outlet } from "react-router-dom";
import AdminSibeBar from "../components/admin/AdminSibeBar";

const AdminLayout = () => {
  return (
    <div className="flex gap-16">
      <div className="sticky top-0">
        <AdminSibeBar />
      </div>
      <div className="my-10 flex-1 pr-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
