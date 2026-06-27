import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import PlayerBar from './components/PlayerBar'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import DiscoveryPage from './pages/DiscoveryPage'
import SearchPage from './pages/SearchPage'

function Shell() {
  const location = useLocation()
  const bare = ['/', '/login'].includes(location.pathname)

  if (bare) {
    return (
      <Routes>
        <Route path="/"      element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-sp-black overflow-hidden">
      <TopBar />
      <div className="flex flex-1 gap-2 px-2 overflow-hidden min-h-0">
        <Sidebar />
        <div className="flex-1 bg-sp-dark rounded-lg overflow-hidden flex flex-col min-w-0">
          <Routes>
            <Route path="/home"     element={<HomePage />} />
            <Route path="/discover" element={<DiscoveryPage />} />
            <Route path="/search"   element={<SearchPage />} />
            <Route path="*"         element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
      <div className="px-2 pb-2">
        <PlayerBar />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
