import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSignInFailure,
  adminSignInStart,
  adminSignInSuccess,
} from "../../app/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" }); 
  const { adminLoading,error} = useSelector((state: RootState) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(adminSignInStart());

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.status) {
        dispatch(adminSignInFailure(data));
        return;
      }

      dispatch(adminSignInSuccess(data));
      navigate("/admin");
    } catch (error: any) {
      dispatch(adminSignInFailure(error.toString())); // Ensure error is dispatched as a string or appropriate format
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[100vh] p-8">
      <h2 className="text-4xl font-semibold">Admin Login</h2>
      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="border rounded w-96 p-2"
          placeholder="Username"
          id="email"
          value={formData.email} // Ensure value is linked to formData
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="border rounded w-96 p-2"
          placeholder="Password"
          id="password"
          value={formData.password} // Ensure value is linked to formData
          onChange={handleInputChange}
        />
        <p className="text-red-600">
          {error ? error.message || "Something went wrong" : ""}
        </p>
        <button
          className="bg-blue-500 p-2 text-white font-semibold rounded disabled:opacity-70"
          type="submit"
          disabled={adminLoading} // Disable button while loading
        >
          {adminLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
