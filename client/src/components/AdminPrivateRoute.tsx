import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../app/store";

const AdminPrivateRoute = () => {
  const { adminStatus } = useSelector((state:RootState) => state.admin);
  return adminStatus ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
