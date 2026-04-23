import './AuthPages.css'

export default function ResetPasswordPage({ onBack, onNext }) {
  return (
    <div className="auth-page auth-reset">
      <div className="auth-panel">
        <div className="auth-brand">chaloo</div>
        <p className="auth-subtitle">Reset your password quickly using the email or mobile linked to your account.</p>
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Enter email or mobile number
            <input type="text" placeholder="Email or contact number" required />
          </label>
          <button type="button" className="button-primary" onClick={onNext}>
            Send OTP
          </button>
        </form>
        <div className="auth-footer">
          <button type="button" className="link-button" onClick={onBack}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}
