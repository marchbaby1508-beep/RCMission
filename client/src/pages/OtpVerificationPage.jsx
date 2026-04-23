import { useState } from 'react'
import './AuthPages.css'

export default function OtpVerificationPage({ onVerified, onBack }) {
  const [method, setMethod] = useState('email')
  const [value, setValue] = useState('')
  const [verified, setVerified] = useState(false)

  function handleVerify(event) {
    event.preventDefault()
    setVerified(true)
  }

  return (
    <div className="auth-page auth-otp">
      <div className="auth-panel">
        <div className="auth-brand">chaloo</div>
        <p className="auth-subtitle">Choose how you want to receive the OTP and verify your identity.</p>
        <form className="auth-form" onSubmit={handleVerify}>
          <div className="radio-group">
            <label className={method === 'email' ? 'active' : ''}>
              <input
                type="radio"
                name="otp-method"
                value="email"
                checked={method === 'email'}
                onChange={() => setMethod('email')}
              />
              Email
            </label>
            <label className={method === 'contact' ? 'active' : ''}>
              <input
                type="radio"
                name="otp-method"
                value="contact"
                checked={method === 'contact'}
                onChange={() => setMethod('contact')}
              />
              Contact number
            </label>
          </div>
          <label>
            {method === 'email' ? 'Email address' : 'Contact number'}
            <input
              type={method === 'email' ? 'email' : 'tel'}
              placeholder={method === 'email' ? 'you@example.com' : '+91 98765 43210'}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            />
          </label>
          <button type="submit" className="button-primary">
            Verify OTP
          </button>
        </form>
        <div className="auth-footer">
          <button type="button" className="link-button" onClick={onBack}>
            Back to Reset
          </button>
        </div>
      </div>
      {verified && (
        <div className="popup-overlay" onClick={() => setVerified(false)}>
          <div className="popup-card" onClick={(event) => event.stopPropagation()}>
            <h3>Verification successful</h3>
            <p>Your account has been verified. You can now continue to book your bus ticket.</p>
            <button className="button-primary" onClick={onVerified}>
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
