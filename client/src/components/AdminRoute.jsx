import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () =>
  localStorage.getItem("adminToken") ? <Outlet /> : <Navigate to="/admin-login" />;