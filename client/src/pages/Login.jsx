import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="auth-page" id="login-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" className="auth-logo" id="auth-logo-link">
            <span className="auth-logo-icon">🚍</span>
            <span className="auth-logo-text">CHALOO</span>
          </Link>
          <h2 className="auth-left-title">
            Your Journey <br /> Starts Here
          </h2>
          <p className="auth-left-subtitle">
            Book bus tickets across Nepal in seconds. Trusted by over 2 million travelers.
          </p>
          <div className="auth-perks">
            <div className="perk-item">✅ Instant e-Ticket delivery</div>
            <div className="perk-item">✅ Secure & encrypted payments</div>
            <div className="perk-item">✅ Easy cancellation & refunds</div>
            <div className="perk-item">✅ 24/7 customer support</div>
          </div>
          <div className="auth-left-illustration">🚌</div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right" id="login-right-panel">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Welcome back! 👋</h1>
          <p className="auth-form-subtitle">Login to your CHALOO account</p>

          {success ? (
            <div className="success-box" id="login-success-msg">
              <div className="success-icon">🎉</div>
              <h3>Login Successful!</h3>
              <p>Welcome back! Redirecting to home...</p>
              <Link to="/" className="auth-back-home">← Back to Home</Link>
            </div>
          ) : (
            <>
              {/* Social Login */}
              <div className="social-login-row">
                <button className="social-btn google-btn" id="google-login-btn" type="button">
                  <span className="social-btn-icon">🔵</span> Continue with Google
                </button>
                <button className="social-btn fb-btn" id="fb-login-btn" type="button">
                  <span className="social-btn-icon">📘</span> Continue with Facebook
                </button>
              </div>

              <div className="divider-row">
                <div className="divider-line" />
                <span className="divider-text">or login with email</span>
                <div className="divider-line" />
              </div>

              <form className="auth-form" id="login-form" onSubmit={handleSubmit} noValidate>
                <div className="field-group" id="field-email">
                  <label htmlFor="login-email">Email Address</label>
                  <div className="field-input-wrap">
                    <span className="field-icon">✉️</span>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={errors.email ? "input-error" : ""}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="field-group" id="field-password">
                  <label htmlFor="login-password">Password</label>
                  <div className="field-input-wrap">
                    <span className="field-icon">🔒</span>
                    <input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className={errors.password ? "input-error" : ""}
                      autoComplete="current-password"
                    />
                  </div>
                  {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                <div className="form-options">
                  <label className="remember-label" id="remember-me-label">
                    <input type="checkbox" id="remember-me" /> Remember me
                  </label>
                  <Link to="/signup" className="forgot-link" id="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`auth-submit-btn ${loading ? "loading" : ""}`}
                  id="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-spinner">⏳ Logging in...</span>
                  ) : "Login →"}
                </button>
              </form>

              <p className="auth-switch-text">
                Don't have an account?{" "}
                <Link to="/signup" className="auth-switch-link" id="goto-signup-link">
                  Sign Up Free
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;