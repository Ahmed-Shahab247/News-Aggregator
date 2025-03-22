// SignupPage.tsx
import React, { useState } from "react";
import { useSignUpEmailPassword } from "@nhost/react";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();

  const handleSignUp = async () => {
    setError("");
    try {
      const { error } = await signUpEmailPassword(email, password);
      if (error) {
        setError(error.message);
        return;
      }
      console.log("Sign-Up Successful");
      alert("Sign-Up Successful! Please log in.");
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-full bg-green-500 text-white p-2 rounded mb-2"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gray-500 text-white p-2 rounded"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
