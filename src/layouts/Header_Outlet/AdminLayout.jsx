import { Outlet } from "react-router-dom";
import AdminSidebar from "./Admin/adminSidebar";
import AdminNavbar from "./AuthNavbar"

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1}}>
        <AdminNavbar/>
        <Outlet />
      </div>
    </div>
  );
}
