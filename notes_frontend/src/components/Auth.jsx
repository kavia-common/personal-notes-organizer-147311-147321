import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function Auth() {
  const { login } = useAuth();
  const [mode, setMode] = useState("login"); // or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) setError(res.error || "Authentication failed");
  };

  return (
    <div className="auth-wrapper">
      <h2>{mode === "login" ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          className="text-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="text-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={
            mode === "login" ? "current-password" : "new-password"
          }
        />
        {error && <div className="error-msg">{error}</div>}
        <button disabled={loading} className="accent-btn" type="submit">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </button>
        <div className="auth-toggle">
          {mode === "login" ? (
            <span>
              Don't have an account?{" "}
              <button type="button" onClick={() => setMode("signup")}>
                Sign up.
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")}>
                Log in.
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
