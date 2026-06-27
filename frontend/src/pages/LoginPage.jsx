import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white mx-auto" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
  </svg>
)

function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-[#3E3E3E]" />
      <span className="text-sm text-[#A7A7A7]">or</span>
      <div className="flex-1 h-px bg-[#3E3E3E]" />
    </div>
  )
}

function SocialButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-[#727272] rounded-full py-3 px-4 text-white font-bold text-sm hover:border-white transition-colors relative"
    >
      <span className="absolute left-4">{icon}</span>
      {label}
    </button>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('email')   // 'email' | 'password'
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleContinue = (e) => {
    e.preventDefault()
    if (step === 'email' && email.trim()) {
      setStep('password')
      return
    }
    navigate('/home')
  }

  const handleSocial = () => navigate('/home')

  return (
    <div className="min-h-screen bg-sp-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[328px]">

        {/* Logo */}
        <div className="mb-8 text-center">
          <SpotifyLogo />
        </div>

        {/* Title */}
        <h1 className="text-[2rem] font-black text-white text-center mb-8 leading-tight">
          {step === 'email' ? 'Log in to Spotify' : 'Welcome back'}
        </h1>

        {/* Social buttons — only on email step */}
        {step === 'email' && (
          <>
            <div className="space-y-3 mb-4">
              <SocialButton icon={<GoogleIcon />}   label="Continue with Google"       onClick={handleSocial} />
              <SocialButton icon={<FacebookIcon />} label="Continue with Facebook"     onClick={handleSocial} />
              <SocialButton icon={<AppleIcon />}    label="Continue with Apple"        onClick={handleSocial} />
              <SocialButton icon={<PhoneIcon />}    label="Continue with phone number" onClick={handleSocial} />
            </div>

            <Divider />
          </>
        )}

        {/* Form */}
        <form onSubmit={handleContinue} className="space-y-4">
          {step === 'email' ? (
            <div>
              <label className="block text-sm font-bold text-white mb-1">Email or username</label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email or username"
                autoFocus
                className="w-full bg-[#121212] border border-[#727272] focus:border-white rounded-md px-4 py-3 text-white text-sm placeholder-[#A7A7A7] focus:outline-none transition-colors"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-bold text-white">Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full bg-[#121212] border border-[#727272] focus:border-white rounded-md px-4 py-3 text-white text-sm placeholder-[#A7A7A7] focus:outline-none transition-colors"
              />
              <button type="button" className="mt-2 text-white text-sm font-bold underline hover:text-sp-green transition-colors">
                Forgot your password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-sp-green hover:bg-sp-green-h text-black font-bold py-3 rounded-full text-sm transition-colors mt-2"
          >
            {step === 'email' ? 'Continue' : 'Log In'}
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-[#A7A7A7] text-sm mt-8">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/home')}
            className="text-white font-bold underline hover:text-sp-green transition-colors"
          >
            Sign up for Spotify
          </button>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center max-w-xs">
        <p className="text-[#A7A7A7] text-[11px] leading-relaxed">
          This site is protected by reCAPTCHA and the Google{' '}
          <span className="underline cursor-pointer hover:text-white">Privacy Policy</span>
          {' '}and{' '}
          <span className="underline cursor-pointer hover:text-white">Terms of Service</span>
          {' '}apply.
        </p>
      </div>
    </div>
  )
}
