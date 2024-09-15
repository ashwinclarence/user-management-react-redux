import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../app/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";


// signIn type
type SignInType = {
  email: string;
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<SignInType>({email:"",password:""});
  const { loading, error } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInFailure(false))
  },[])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(signInStart());

        // validate the form fields
      if (formData.email?.trim() === '' || formData.password?.trim() === '') {
        dispatch(signInFailure({message:"Empty username or password"}));
        return 
      }

      let res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // if the response is failure then update the error to the redux
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      // if everything is correct redirect to home
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = () => {
    toast.warning("the functionality is not ready yet");
  };

  // this is the login page
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[100vh] p-8">
      <h2 className="text-4xl font-semibold">Sign In</h2>
      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="border rounded w-96 p-2"
          placeholder="Username"
          id="email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="border rounded w-96 p-2"
          placeholder="Password"
          id="password"
          onChange={handleInputChange}
        />
        <p className="text-red-600">
          {error ?( error.message || "Something went wrong") : ""}
        </p>
        <button
          className="bg-blue-500 p-2 text-white font-semibold rounded disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign In"}
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
          Are you a new user{" "}
          <Link to="/sign-up" className="text-blue-600 font-semibold">
            Sign Up
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignIn;
