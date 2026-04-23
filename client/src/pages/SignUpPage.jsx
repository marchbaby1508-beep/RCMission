import './AuthPages.css'

export default function SignUpPage({ onBackHome, onLogin, onForgotPassword }) {
  return (
    <div className="auth-page auth-signup">
      <div className="auth-panel">
        <div className="auth-brand">chaloo</div>
        <p className="auth-subtitle">Create your account to book bus tickets quickly and securely.</p>
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Email address
            <input type="email" placeholder="Enter your email" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a password" required />
          </label>
          <button type="submit" className="button-primary">
            Sign Up
          </button>
        </form>
        <div className="auth-footer auth-link-row">
          <span>Already have an account?</span>
          <button type="button" className="link-button" onClick={onLogin}>
            Login
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
