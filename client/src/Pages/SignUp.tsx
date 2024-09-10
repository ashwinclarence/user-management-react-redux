import { useState } from "react";
import { Link } from "react-router-dom";

// registration for the user
const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border rounded w-96 p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border rounded w-96 p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="border rounded w-96 p-2"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
