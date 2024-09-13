import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "../app/store";
import noProfile from "../assets/profile.png";

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <nav className="bg-slate-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div>
          <Link to="/" className="text-white text-3xl font-bold">
            Manifest
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 border-red-500"
                : "text-white hover:text-red-500 transition-all"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 border-red-500"
                : "text-white hover:text-red-500 transition-all"
            }
          >
            About
          </NavLink>

          {/* Sign In / User Profile */}
          {!currentUser ? (
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-white hover:text-red-500 transition-all"
              }
            >
              Sign In
            </NavLink>
          ) : (
            <div className="relative">
              {/* Profile Picture */}
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture || noProfile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </Link>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
