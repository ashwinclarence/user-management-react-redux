import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/User/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/User/Profile";
import SignIn from "./Pages/User/SignIn";
import SignUp from "./Pages/User/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import Login from "./Pages/Admin/Login";
import ViewUser from "./Pages/Admin/ViewUser";
import AdminNavbar from "./components/AdminNavbar";
import Dashboard from "./Pages/Admin/Dashboard";

const App = () => {
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {isAdmin?<AdminNavbar/>: <Navbar />}
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />

          {/* protect the router if user is login only */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/user" element={<ViewUser />} />
            <Route path="/admin/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
