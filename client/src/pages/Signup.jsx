import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.phone) errs.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone)) errs.phone = "Enter a valid 10-digit phone number.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords do not match.";
    if (!form.agreeTerms) errs.agreeTerms = "You must agree to the terms.";
    return errs;
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return { label: "", level: 0 };
    if (p.length < 6) return { label: "Weak", level: 1 };
    if (p.length < 10 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: "Fair", level: 2 };
    if (p.length >= 10 && /[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p))
      return { label: "Strong", level: 4 };
    return { label: "Good", level: 3 };
  };

  const strength = getPasswordStrength();

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
    }, 1600);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  if (showForgot) {
    return (
      <div className="auth-page" id="forgot-page">
        <div className="auth-left">
          <div className="auth-left-content">
            <Link to="/" className="auth-logo">
              <span className="auth-logo-icon">🚍</span>
              <span className="auth-logo-text">CHALOO</span>
            </Link>
            <h2 className="auth-left-title">Reset Your Password</h2>
            <p className="auth-left-subtitle">We'll send a reset link to your email address.</p>
            <div className="auth-left-illustration">🔑</div>
          </div>
        </div>
        <div className="auth-right" id="forgot-right-panel">
          <div className="auth-form-container">
            <h1 className="auth-form-title">Forgot Password?</h1>
            <p className="auth-form-subtitle">Enter your email to receive a reset link.</p>

            {forgotSent ? (
              <div className="success-box" id="forgot-success-msg">
                <div className="success-icon">📧</div>
                <h3>Reset Link Sent!</h3>
                <p>Check your email inbox for the password reset link.</p>
                <button
                  className="auth-submit-btn"
                  id="back-to-signup-btn"
                  onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(""); }}
                >
                  ← Back to Sign Up
                </button>
              </div>
            ) : (
              <form className="auth-form" id="forgot-form" onSubmit={handleForgot}>
                <div className="field-group" id="forgot-email-field">
                  <label htmlFor="forgot-email">Email Address</label>
                  <div className="field-input-wrap">
                    <span className="field-icon">✉️</span>
                    <input
                      id="forgot-email"
                      type="email"
                      placeholder="your@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="auth-submit-btn" id="send-reset-btn">
                  Send Reset Link 📧
                </button>
                <p className="auth-switch-text">
                  <button
                    type="button"
                    className="text-btn"
                    id="cancel-forgot-btn"
                    onClick={() => setShowForgot(false)}
                  >
                    ← Back to Sign Up
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page" id="signup-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" className="auth-logo" id="signup-logo-link">
            <span className="auth-logo-icon">🚍</span>
            <span className="auth-logo-text">CHALOO</span>
          </Link>
          <h2 className="auth-left-title">
            Join <br /> Millions of <br /> Travelers
          </h2>
          <p className="auth-left-subtitle">
            Create a free account and start booking bus tickets instantly. No hidden charges.
          </p>
          <div className="auth-perks">
            <div className="perk-item">🎁 First ticket 10% off</div>
            <div className="perk-item">📍 Real-time bus tracking</div>
            <div className="perk-item">💳 Multiple payment options</div>
            <div className="perk-item">⭐ Earn reward points</div>
          </div>
          <div className="auth-left-illustration">🎉</div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right" id="signup-right-panel">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Create Account 🚀</h1>
          <p className="auth-form-subtitle">Sign up and start your journey today</p>

          {success ? (
            <div className="success-box" id="signup-success-msg">
              <div className="success-icon">✅</div>
              <h3>Account Created!</h3>
              <p>Welcome to CHALOO! You can now login and book your tickets.</p>
              <Link to="/login" className="auth-submit-btn" id="goto-login-after-signup" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                Login Now →
              </Link>
            </div>
          ) : (
            <>
              {/* Social Signup */}
              <div className="social-login-row">
                <button className="social-btn google-btn" id="google-signup-btn" type="button">
                  <span className="social-btn-icon">🔵</span> Sign up with Google
                </button>
                <button className="social-btn fb-btn" id="fb-signup-btn" type="button">
                  <span className="social-btn-icon">📘</span> Sign up with Facebook
                </button>
              </div>

              <div className="divider-row">
                <div className="divider-line" />
                <span className="divider-text">or sign up with email</span>
                <div className="divider-line" />
              </div>

              <form className="auth-form signup-form" id="signup-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="field-group" id="field-name">
                    <label htmlFor="signup-name">Full Name</label>
                    <div className="field-input-wrap">
                      <span className="field-icon">👤</span>
                      <input
                        id="signup-name"
                        type="text"
                        placeholder="Your Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={errors.name ? "input-error" : ""}
                      />
                    </div>
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  <div className="field-group" id="field-phone">
                    <label htmlFor="signup-phone">Phone Number</label>
                    <div className="field-input-wrap">
                      <span className="field-icon">📱</span>
                      <input
                        id="signup-phone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={errors.phone ? "input-error" : ""}
                      />
                    </div>
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="field-group" id="field-signup-email">
                  <label htmlFor="signup-email">Email Address</label>
                  <div className="field-input-wrap">
                    <span className="field-icon">✉️</span>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={errors.email ? "input-error" : ""}
                    />
                  </div>
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-row">
                  <div className="field-group" id="field-signup-password">
                    <label htmlFor="signup-password">Password</label>
                    <div className="field-input-wrap">
                      <span className="field-icon">🔒</span>
                      <input
                        id="signup-password"
                        type="password"
                        placeholder="At least 8 characters"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className={errors.password ? "input-error" : ""}
                      />
                    </div>
                    {form.password && (
                      <div className="password-strength" id="password-strength-bar">
                        <div className="strength-bars">
                          {[1, 2, 3, 4].map((lvl) => (
                            <div
                              key={lvl}
                              className={`strength-bar ${lvl <= strength.level ? `level-${strength.level}` : ""}`}
                            />
                          ))}
                        </div>
                        <span className={`strength-label level-text-${strength.level}`}>
                          {strength.label}
                        </span>
                      </div>
                    )}
                    {errors.password && <span className="field-error">{errors.password}</span>}
                  </div>

                  <div className="field-group" id="field-confirm-password">
                    <label htmlFor="signup-confirm-password">Confirm Password</label>
                    <div className="field-input-wrap">
                      <span className="field-icon">🔑</span>
                      <input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="Repeat your password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        className={errors.confirmPassword ? "input-error" : ""}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="field-error">{errors.confirmPassword}</span>
                    )}
                  </div>
                </div>

                <div className="field-group terms-group" id="field-terms">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      id="agree-terms"
                      checked={form.agreeTerms}
                      onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                    />
                    <span>
                      I agree to the{" "}
                      <a href="#" className="terms-link" id="terms-link">Terms of Service</a> and{" "}
                      <a href="#" className="terms-link" id="privacy-link">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
                </div>

                <button
                  type="submit"
                  className={`auth-submit-btn ${loading ? "loading" : ""}`}
                  id="signup-submit-btn"
                  disabled={loading}
                >
                  {loading ? "⏳ Creating Account..." : "Create Account 🚀"}
                </button>
              </form>

              <div className="auth-links-row">
                <p className="auth-switch-text">
                  Already have an account?{" "}
                  <Link to="/login" className="auth-switch-link" id="goto-login-link">
                    Login
                  </Link>
                </p>
                <button
                  type="button"
                  className="forgot-link-btn"
                  id="open-forgot-password-btn"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;