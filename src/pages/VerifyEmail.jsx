import React from "react";
import { Helmet } from "react-helmet";
import "../styles/main.css";
import logo from "../imgs/icon.png";

export default function VerifyEmail() {
    return (
        <div className="login-container">
            <Helmet>
                <title>Verify Your Account | Sales Tracker</title>
                <meta name="description" content="Verify your email to access the dashboard" />
            </Helmet>

            <div className="login-form">
                <div className="loginHeader">
                    <img src={logo} alt="Sales Tracker" />
                    <h2>Verify Your Account</h2>
                </div>
                <div className="card-message" style={{ textAlign: "center", padding: "2rem 1rem" }}>
                    <p>
                        We've sent a verification link to your email, please check and verify your account to access the dashboard.
                    </p>
                </div>
                <a href="/" style={{ color: "#f86", textDecoration: "none", fontSize: "0.9rem", marginTop: "10px", textAlign: "center" }}>Go back to Login</a>
            </div>
        </div>
    );
}
