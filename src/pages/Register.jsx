import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import logo from "../imgs/icon.png";
import { supabase } from "../supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    position: "user", // Default position, can be changed later
                    role: "user", // Default role, can be changed later
                },
            },
        });

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        const user = data?.user;
        if (user) {
            const { error: profileError } = await supabase.from("profiles").insert([
                {
                    id: user.id,
                    full_name: fullName,
                },
            ]);

            if (profileError) {
                setError("Account created, but profile could not be saved: " + profileError.message);
                setLoading(false);
                return;
            }
        }

        navigate("/verify-email"); // Redirect to verify email page
        setLoading(false);
    };

    return (
        <div className="login-container">
            <Helmet>
                <title>Create an Account | Alo—Sales</title>
                <meta name="description" content="Create a new account" />
            </Helmet>

            <div className="login-form">
                <div className="loginHeader">
                    <img src={logo} alt="Sales Tracker" />
                    <h2>Create an Account</h2>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="fullname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Full Name"
                        />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group" style={{ position: "relative" }}>
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
                        <div style={{ position: "relative", marginTop: "10px" }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm Password"
                                style={{ paddingRight: ".5rem" }}
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="password-toggle"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                tabIndex={0}
                                role="button"
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") setShowConfirmPassword((prev) => !prev);
                                }}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <br />
                    {error && <p className="error">{error}</p>}
                </form>

                <p>Have an account? <a href="/">Login here</a></p>
            </div>
        </div>
    );
}
