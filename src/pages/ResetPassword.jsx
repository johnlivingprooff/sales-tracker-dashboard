import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import logo from "../imgs/icon.png";
import { supabase } from "../supabaseClient";
import { mapSupabaseError } from "../utils/errorUtils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
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

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            setError(mapSupabaseError(error));
        } else {
            setMessage("Password reset email sent! Please check your inbox.");
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <Helmet>
                <title>Reset Your Password | Alo—Sales</title>
                <meta name="description" content="Reset your account password" />
            </Helmet>

            <div className="login-form">
                <div className="loginHeader">
                    <img src={logo} alt="Sales Tracker" />
                    <h2>Reset Your Password</h2>
                    <p>Enter your email address to receive a password reset link</p>
                </div>

                <form onSubmit={handleResetPassword}>
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

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Email"}
                    </button>
                    <br />
                    {error && <p className="error">{error}</p>}
                    {message && <p className="success">{message}</p>}
                </form>

                <p>
                    Don't have an account?{" "}<a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
}
