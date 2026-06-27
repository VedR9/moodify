import { ChevronLeft, ChevronRight, Search, Home, Bell, Users } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const AISparkleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" opacity="0.85"/>
    <path d="M19 14L19.75 17.25L23 18L19.75 18.75L19 22L18.25 18.75L15 18L18.25 17.25L19 14Z" fill="white" opacity="0.6"/>
    <path d="M5 3L5.5 5.5L8 6L5.5 6.5L5 9L4.5 6.5L2 6L4.5 5.5L5 3Z" fill="white" opacity="0.6"/>
  </svg>
)

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex items-center justify-between px-4 h-16 bg-sp-black flex-shrink-0 z-10">
      {/* Left: Logo */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <SpotifyLogo />
      </div>

      {/* Center: Nav + Search */}
      <div className="flex items-center gap-2 flex-1 max-w-[680px]">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center hover:bg-sp-hover transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center hover:bg-sp-hover transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={() => navigate('/home')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            location.pathname === '/home' ? 'bg-white' : 'bg-sp-elevated hover:bg-sp-hover'
          }`}
        >
          <Home className={`w-5 h-5 ${location.pathname === '/home' ? 'text-black' : 'text-white'}`} />
        </button>

        {/* Search bar */}
        <div
          className="flex items-center gap-3 flex-1 bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors rounded-full px-4 h-10 cursor-text"
          onClick={() => navigate('/search')}
        >
          <Search className="w-4 h-4 text-white flex-shrink-0" />
          <span className="text-sm text-sp-muted flex-1">What do you want to play?</span>
          <div className="w-px h-5 bg-sp-subtle flex-shrink-0" />
          <AISparkleIcon />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 min-w-[200px] justify-end">
        <button className="text-sm font-semibold bg-white text-black rounded-full px-4 py-1.5 hover:scale-105 transition-transform whitespace-nowrap">
          Explore Premium
        </button>
        <button className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-white hover:text-white/80 transition-colors whitespace-nowrap">
          Install App
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-sp-muted hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-sp-muted hover:text-white transition-colors">
          <Users className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-sm font-bold">
          V
        </button>
      </div>
    </div>
  )
}
