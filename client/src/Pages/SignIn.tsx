import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      setLoading(true);
      let res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });

      
      
      const data = await res.json();
      console.log(data);
      setLoading(false);

      if (data.success === false) {
        return;
      }

      navigate('/')
      

    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    try {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = () => {
    toast.warning("the functionality is not ready yet")
  }


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
         Are you a new user {" "}
          <Link to="/sign-up" className="text-blue-600 font-semibold">
            Sign Up
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignIn;
