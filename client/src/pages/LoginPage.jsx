import './AuthPages.css'

export default function LoginPage({ onBackHome, onSignUp, onForgotPassword }) {
  return (
    <div className="auth-page auth-login">
      <div className="auth-panel">
        <div className="auth-brand">chaloo</div>
        <p className="auth-subtitle">Log in to access your bus bookings and manage travel plans.</p>
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Email address
            <input type="email" placeholder="Enter your email" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter your password" required />
          </label>
          <button type="submit" className="button-primary">
            Login
          </button>
        </form>
        <div className="auth-footer auth-link-row">
          <span>Don't have an account?</span>
          <button type="button" className="link-button" onClick={onSignUp}>
            Sign Up
          </button>
        </div>
        <div className="auth-footer auth-footer-small">
          <button type="button" className="link-button" onClick={onForgotPassword}>
            Forgot password?
          </button>
        </div>
        <div className="auth-footer">
          <button type="button" className="link-button" onClick={onBackHome}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
