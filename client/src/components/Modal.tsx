import { useState } from "react";
import { currentUserType } from "../types/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  addNewUserFailure,
  addNewUserStart,
  addNewUserSuccess,
} from "../app/admin/adminSlice";

type RegisterErrorType = {
  name?: string;
  email?: string;
  password?: string;
};

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [registerError, setRegisterError] = useState<RegisterErrorType>();
  const [formData, setFormData] = useState<currentUserType>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { adminLoading ,error} = useSelector((state: RootState) => state.admin);

  // toggle for modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // function to handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  // function to form submit
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      dispatch(addNewUserStart());

      if (!validateFormInputs()) {
        dispatch(addNewUserFailure("Invalid user details"));
        return;
      }

      let res = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = await res.json();

      if (!res.ok || data.status === false) {
        dispatch(addNewUserFailure(data.message));
        return;
      }
      setIsOpen(false);
      dispatch(addNewUserSuccess(data));
    } catch (error) {
      dispatch(addNewUserFailure(error));
    }
  };

  // function for form validation
  const validateFormInputs = () => {
    try {
      let validFormField = true;
      let foundError: RegisterErrorType = {
        name: "",
        email: "",
        password: "",
      };
      if (!formData.email || formData.email.trim() === "") {
        validFormField = false;
        foundError.email = "Invalid email";
      }
      if (!formData.name || formData.name.trim() === "") {
        validFormField = false;
        foundError.name = "Invalid name";
      }
      if (!formData.password || formData.password.trim() === "") {
        validFormField = false;
        foundError.password = "Invalid password";
      }
      setRegisterError(foundError);
      return validFormField;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Modal toggle button */}
      <button
        onClick={toggleModal}
        className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        Create New User
      </button>

      {/* Main modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow ">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-800">
                <h3 className="text-xl font-semibold text-white">
                  Add New User
                </h3>
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
                  className="flex flex-col gap-6"
                  onSubmit={handleFormSubmit}
                >
                  <div>
                    <input
                      type="text"
                      className="border rounded  w-full p-2"
                      placeholder="Name"
                      id="name"
                      onChange={handleInputChange}
                    />{" "}
                    {registerError && (
                      <p className="text-red-600">{registerError.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="border rounded  w-full  p-2"
                      placeholder="Username"
                      id="email"
                      onChange={handleInputChange}
                    />
                    {registerError && (
                      <p className="text-red-600">{registerError.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      className="border rounded w-full p-2"
                      placeholder="Password"
                      id="password"
                      onChange={handleInputChange}
                    />
                    {registerError && (
                      <p className="text-red-600">{registerError.password}</p>
                    )}
                  </div>
                  {error ? <p className="text-red-600">{ error}</p>:""}
                  <button
                    className="bg-blue-500 p-2 text-white font-semibold rounded disabled:opacity-70"
                    type="submit"
                    disabled={adminLoading}
                  >
                    {adminLoading ? "loading..." : "Create User"}
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

export default Modal;
