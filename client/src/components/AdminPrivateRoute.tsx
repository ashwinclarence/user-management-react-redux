import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { adminStatus } = useSelector((state) => state.admin);
  return adminStatus ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
