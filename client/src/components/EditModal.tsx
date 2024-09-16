import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  editUserFailure,
  editUserStart,
  editUserSuccess,
} from "../app/admin/adminSlice";

type EditModalType = {
  name: string;
  email: string;
  id: string;
};

const EditModal = ({ name, email, id }: EditModalType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const dispatch = useDispatch();

  const { adminLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // function to form submit
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      dispatch(editUserStart());

      if (editName.trim() === "") {
        dispatch(editUserFailure("Fields are empty"));
        return;
      }

      let res = await fetch(`/api/admin/edit-user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:editName}),
      });

      let data = await res.json();

      if (data.status === false) {
        dispatch(editUserFailure(data));
        return;
      }
      setIsOpen(false)

      dispatch(editUserSuccess(data));
    } catch (error) {
      dispatch(editUserFailure(error));
    }
  };

  return (
    <div>
      {/* Modal toggle button */}
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        Edit User
      </button>

      {/* Main modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow ">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-800">
                <h3 className="text-xl font-semibold text-white">Edit User</h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                >
                  <i className="fa-regular fa-circle-xmark"></i>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                <form
                  className="flex flex-col gap-6 p-4"
                  onSubmit={handleFormSubmit}
                >
                  <input
                    type="text"
                    className="border rounded  p-2"
                    placeholder="Name"
                    id="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />{" "}
                  <input
                    type="text"
                    className="border rounded  p-2"
                    placeholder="Username"
                    id="email"
                    value={email}
                    disabled
                  />
                  {error ? <b className="text-red-500"> {error}</b> : ""}
                  <button
                    className="bg-blue-500 p-2 text-white font-semibold rounded disabled:opacity-70"
                    type="submit"
                    disabled={adminLoading}
                  >
                    {adminLoading ? "loading..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
