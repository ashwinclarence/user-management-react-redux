import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetailsFailure,
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../app/admin/adminSlice";

const ViewUser = () => {
  const dispatch = useDispatch();
  const { userDetails, adminLoading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  const handleGetUserDetails = async () => {
    try {
      dispatch(fetchUserDetailsStart());
      let res = await fetch("/api/admin/user");

      let data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user details");
      }

      dispatch(fetchUserDetailsSuccess(data));
    } catch (error) {
      dispatch(fetchUserDetailsFailure(error));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {

      const confirmed = window.confirm("Are you sure you want to delete this user?");
      
      if (!confirmed) {
        return;
      }

      dispatch(deleteUserStart());

      const res = await fetch(`/api/admin/delete-user/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      dispatch(deleteUserSuccess(userId)); // Update Redux state
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  return (
    <div className="mt-10 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">User Details</h1>
      {adminLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-gray-600">Sl.no</th>
              <th className="py-3 px-6 text-left text-gray-600">Name</th>
              <th className="py-3 px-6 text-left text-gray-600">Email</th>
              <th className="py-3 px-6 text-left text-gray-600">
                Joining Date
              </th>
              <th className="py-3 px-6 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((user: any, index: number) => (
              <tr key={user._id} className="border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    onClick={() => console.log("Edit user feature")}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={adminLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUser;
