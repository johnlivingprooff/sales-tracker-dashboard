import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import logo from "../imgs/icon.png";
import { supabase } from "../supabaseClient";
import { mapSupabaseError } from "../utils/errorUtils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
        if (message) {
            const timer = setTimeout(() => setMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error, message]);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(mapSupabaseError(error));
        } else {
            setMessage("Password updated successfully!");
            setPassword("");
            setConfirmPassword("");
            navigate("/dashboard"); // Redirect to dashboard after successful update
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <Helmet>
                <title>Update Password | Alo—Sales</title>
                <meta name="description" content="Update your account password" />
            </Helmet>

            <div className="login-form">
                <div className="loginHeader">
                    <img src={logo} alt="Sales Tracker" />
                    <h2>Update Your Password</h2>
                    <p>Enter your new password below</p>
                </div>

                <form onSubmit={handleUpdatePassword}>
                    <div className="form-group password-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="New Password"
                            minLength={8}
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{ cursor: "pointer", marginLeft: "-30px" }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="form-group password-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm New Password"
                            minLength={8}
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            style={{ cursor: "pointer", marginLeft: "-30px" }}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                    <br />
                    {error && <p className="error">{error}</p>}
                    {message && <p className="success">{message}</p>}
                </form>
            </div>
        </div>
    );
}
