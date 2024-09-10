import { useState } from "react";
import { Link } from "react-router-dom";

// registration for the user
const SignUp = () => {
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();
        console.log(formData)
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData,[e.target.id]:e.target.value})
  };
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[100vh] p-8">
      <h2 className="text-4xl font-semibold">Sign Up</h2>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <input
          type="text"
          className="border rounded w-96 p-2"
          placeholder="Name"
          id="name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          className="border rounded w-96 p-2"
          placeholder="Username"
          id="username"
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="border rounded w-96 p-2"
          placeholder="Password"
          id="password"
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="border rounded w-96 p-2"
          placeholder="Confirm Password"
          id="confirm-password"
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 p-2 text-white font-semibold rounded"
          type="submit"
        >
          Sign Up
        </button>
        <h2 className="text-center my-4">OR</h2>
        <button
          className="bg-red-600 p-2 text-white font-semibold rounded"
          type="button"
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
