import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import logo from "../imgs/icon.png";
import { supabase } from "../supabaseClient";
import { mapSupabaseError } from "../utils/errorUtils"; // Assuming you have a utility function to map errors
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
    useEffect(() => {
          if (error) {
              const timer = setTimeout(() => setError(""), 5000);
              return () => clearTimeout(timer);
          }
      }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        
        setError(mapSupabaseError(error));
        setLoading(false);
    }
 
    
    else {
      navigate("/dashboard"); // React-router navigation
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Login | Alo—Sales</title>
        <meta name="description" content="Login to your account" />
      </Helmet>

      <div className="login-form">
        <div className="loginHeader">
          <img src={logo} alt="Sales Tracker" />
          <h2>Sales Tracker Login</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>

            <div style={{ position: "relative" }}>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    style={{ paddingRight: "0.5rem" }}
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="password-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") setShowPassword((prev) => !prev);
                    }}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
            <br />
          {error && <p className="error">{error}</p>}
        </form>

        <p>
          <a href="/reset-password">Forgot Your Password?</a> &nbsp;//&nbsp; Don't have an account?{" "}
          <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
