import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import OtpVerificationPage from './pages/OtpVerificationPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

const VIEWS = {
  home: 'home',
  login: 'login',
  signup: 'signup',
  reset: 'reset',
  otp: 'otp',
  dashboard: 'dashboard',
}

function App() {
  const [view, setView] = useState(VIEWS.home)

  return (
    <div className="app-shell">
      {view === VIEWS.home && (
        <HomePage onLogin={() => setView(VIEWS.login)} onSignUp={() => setView(VIEWS.signup)} />
      )}
      {view === VIEWS.login && (
        <LoginPage
          onBackHome={() => setView(VIEWS.home)}
          onSignUp={() => setView(VIEWS.signup)}
          onForgotPassword={() => setView(VIEWS.reset)}
        />
      )}
      {view === VIEWS.signup && (
        <SignUpPage
          onBackHome={() => setView(VIEWS.home)}
          onLogin={() => setView(VIEWS.login)}
          onForgotPassword={() => setView(VIEWS.reset)}
        />
      )}
      {view === VIEWS.reset && (
        <ResetPasswordPage
          onBack={() => setView(VIEWS.login)}
          onNext={() => setView(VIEWS.otp)}
        />
      )}
      {view === VIEWS.otp && (
        <OtpVerificationPage onBack={() => setView(VIEWS.reset)} onVerified={() => setView(VIEWS.dashboard)} />
      )}
      {view === VIEWS.dashboard && <DashboardPage />}
    </div>
  )
}

export default App
