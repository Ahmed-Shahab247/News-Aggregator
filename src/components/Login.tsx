import { useState, useEffect } from "react";
import { useSignInEmailPassword } from "@nhost/react";
import { useNavigate } from "react-router-dom";
import { nhost } from "../App"; // ✅ Ensure correct import

const Login = () => {
  const navigate = useNavigate();
  const { signInEmailPassword, isLoading, isSuccess, isError, error } = useSignInEmailPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // ✅ Auto sign out ONLY if `nhost` is initialized
    if (nhost?.auth) {
      nhost.auth.signOut();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/"); // Redirect to main page after successful login
    }
  }, [isSuccess, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
        <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
