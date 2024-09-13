import { Link } from "react-router-dom";

const AdminNavbar = () => {

    const handleAdminLogout = async() => {
        try {
            await fetch('/api/admin/logout');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <nav className="bg-slate-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/admin" className="text-white text-3xl font-bold">
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/admin/user" className="text-white">user</Link>
          <button onClick={handleAdminLogout} className="text-white">logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
