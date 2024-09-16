import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signUpStart,
  signUpFailure,
  signUpSuccess,
} from "../../app/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

type SignUpType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterErrorType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
// registration for the user
const SignUp = () => {
  const [formData, setFormData] = useState<SignUpType>({
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
  });
  const { loading } = useSelector((state: RootState) => state.user);
  const [registerError, setRegisterError] = useState<RegisterErrorType>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form submit with user details
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(signUpStart());

      if (!validateRegisterForm()) {
        dispatch(signUpFailure({ message: "Invalid fields" }))
        return
      }

      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === false) {
        dispatch(signUpFailure(data));
        toast.error(data.message);
      }
      dispatch(signUpSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signUpFailure(error));
      console.log(error);
    }
  };

  // google authentication
  const handleGoogleAuth = () => {
    try {
      toast.warning("the functionality is not ready yet");
    } catch (error) {
      console.log(error);
    }
  };

  // convert the user input to an object with key as the id of the field and value as the entered value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // function to validate the form fields
  function validateRegisterForm() {
    let validFormField = true;
    let foundError: RegisterErrorType = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    if (
      formData.password !== formData.confirmPassword ||
      !formData.confirmPassword
    ) {
      validFormField = false;
      foundError.confirmPassword = "Confirm password must be same";
    }
    setRegisterError(foundError);
    return validFormField;
  }

  // this is the registration page
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[100vh] p-8">
      <h2 className="text-4xl font-semibold">Sign Up</h2>
      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            className="border rounded w-96 p-2"
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
            className="border rounded w-96 p-2"
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
            className="border rounded w-96 p-2"
            placeholder="Password"
            id="password"
            onChange={handleInputChange}
          />
          {registerError && (
            <p className="text-red-600">{registerError.password}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            className="border rounded w-96 p-2"
            placeholder="Confirm Password"
            id="confirmPassword"
            onChange={handleInputChange}
          />
          {registerError && (
            <p className="text-red-600">{registerError.confirmPassword}</p>
          )}
        </div>
        <button
          className="bg-blue-500 p-2 text-white font-semibold rounded disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
        <h2 className="text-center my-4">OR</h2>
        <button
          className="bg-red-600 p-2 text-white font-semibold rounded"
          type="button"
          disabled={loading}
          onClick={handleGoogleAuth}
        >
          Continue with Google
        </button>
        <p>
          Already have an account{" "}
          <Link to="/sign-in" className="text-blue-600 font-semibold">
            Sign In
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
