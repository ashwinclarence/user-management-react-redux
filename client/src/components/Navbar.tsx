import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "../app/store";

const Navbar = () => {
  const { currentUser} = useSelector((state:RootState) => state.user);
  return (
    <div>
      <div className="flex items-center justify-between bg-slate-700 text-white p-4">
        <div className="">
          <h2 className="text-3xl font-bold ">Manifest</h2>
        </div>
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-600" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-red-600" : "text-white"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              isActive ? "text-red-600" : "text-white"
            }
          >
            Sign In
          </NavLink>
          <Link to='/profile'>
          {currentUser &&
          <img src={currentUser.profilePicture} alt="" />
        }
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
