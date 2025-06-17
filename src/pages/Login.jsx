import React from "react";
import { Helmet } from "react-helmet";

export default function Login() {
    return (
        <div className="login-container">
            <Helmet>
                <title>Login | Sales Tracker</title>
                <meta name="description" content="Login to your account" />
            </Helmet>
            <h2>Login Page</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
}
