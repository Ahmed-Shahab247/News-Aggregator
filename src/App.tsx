import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NhostClient, NhostProvider, useAuthenticationStatus } from "@nhost/react";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import MainPage from "./MainPage";
import SavedArticlesPage from "./components/SavedArticles";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import client from "./ApolloClient"; // ✅ Correct import

// Nhost Client setup
export const nhost = new NhostClient({
  subdomain: "",// ✅ Your Nhost subdomain
  region: "",// ✅ Your Nhost region
  backendUrl: "", // ✅ Your Nhost backend URL
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthenticationStatus();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <ApolloProvider client={client}> {/* Provide Apollo context */}
      <NhostProvider nhost={nhost}> {/* Provide Nhost context */}
        <Router>
          <Routes>
            <Route path="/savedarticles" element={<ProtectedRoute><SavedArticlesPage /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      </NhostProvider>
    </ApolloProvider>
  );
};

export default App;
