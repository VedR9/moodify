import { Home, Search, Library, Sparkles } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'

const ITEMS = [
  { label: 'Home',     icon: Home,     path: '/home'     },
  { label: 'Search',   icon: Search,   path: '/search'   },
  { label: 'Library',  icon: Library,  path: '/library'  },
  { label: 'Discover', icon: Sparkles, path: '/discover' },
]

export default function BottomNav() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const isMobile  = useIsMobile()

  if (!isMobile) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-[#282828] flex items-center justify-around px-2 pt-2 pb-6 z-50">
      {ITEMS.map(({ label, icon: Icon, path }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <Icon
              className={`w-6 h-6 transition-colors ${active ? 'text-white' : 'text-sp-muted'}`}
              fill={active && label !== 'Discover' ? 'currentColor' : 'none'}
            />
            <span className={`text-[10px] font-medium transition-colors ${active ? 'text-white' : 'text-sp-muted'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
