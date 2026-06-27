import { Plus, ArrowRight, Search, List, Sparkles } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArtistImage } from '../services/musicImages'

const LIBRARY_ITEMS = [
  { id: 1,  name: 'Arijit Singh',   type: 'Artist',   color: '#c0392b', initials: 'AS' },
  { id: 2,  name: 'A.R. Rahman',    type: 'Artist',   color: '#8e44ad', initials: 'AR' },
  { id: 3,  name: 'Shreya Ghoshal', type: 'Artist',   color: '#d35400', initials: 'SG' },
  { id: 4,  name: 'Udit Narayan',   type: 'Artist',   color: '#27ae60', initials: 'UN' },
  { id: 5,  name: 'Mithoon',        type: 'Artist',   color: '#2980b9', initials: 'MI' },
  { id: 6,  name: 'Sunidhi Chauhan',type: 'Artist',   color: '#c0392b', initials: 'SC' },
  { id: 7,  name: 'Darshan Raval',  type: 'Artist',   color: '#16a085', initials: 'DR' },
  { id: 8,  name: 'Sachet Tandon',  type: 'Artist',   color: '#7f8c8d', initials: 'ST' },
  { id: 9,  name: 'Armaan Malik',   type: 'Artist',   color: '#e74c3c', initials: 'AM' },
  { id: 10, name: 'Liked Songs',    type: 'Playlist', color: '#4c1d95', initials: '♥', isPlaylist: true },
  { id: 11, name: 'Chill Vibes',    type: 'Playlist', color: '#1e3a5f', initials: '✦', isPlaylist: true },
  { id: 12, name: 'Late Night Drives', type: 'Playlist', color: '#1a1a2e', initials: '◎', isPlaylist: true },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDiscovery = location.pathname === '/discover'
  const [images, setImages] = useState({})

  useEffect(() => {
    LIBRARY_ITEMS.filter(i => !i.isPlaylist).forEach(async (item) => {
      const url = await getArtistImage(item.name)
      if (url) setImages(prev => ({ ...prev, [item.id]: url }))
    })
  }, [])

  return (
    <div className="w-[280px] min-w-[280px] bg-sp-dark rounded-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <span className="text-white font-bold text-base">Your Library</span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center text-sp-muted hover:text-white transition-colors rounded-full hover:bg-sp-hover">
            <Plus className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-sp-muted hover:text-white transition-colors rounded-full hover:bg-sp-hover">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter chip */}
      <div className="px-4 pb-3 flex-shrink-0">
        <button className="px-3 py-1.5 bg-sp-elevated rounded-full text-white text-xs font-semibold hover:bg-sp-hover transition-colors">
          Artists
        </button>
      </div>

      {/* AI Discovery Entry Point */}
      <div className="px-2 pb-2 flex-shrink-0">
        <button
          onClick={() => navigate('/discover')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
            isDiscovery
              ? 'bg-[#1a3a24] border border-sp-green/30'
              : 'hover:bg-sp-hover'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isDiscovery ? 'bg-sp-green' : 'bg-gradient-to-br from-sp-green to-[#006437]'
          }`}>
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div className="text-left min-w-0">
            <p className={`text-sm font-semibold truncate ${isDiscovery ? 'text-sp-green' : 'text-white'}`}>
              AI Discovery
            </p>
            <p className="text-xs text-sp-muted truncate">Find your vibe</p>
          </div>
          {!isDiscovery && (
            <span className="ml-auto text-[10px] font-bold text-black bg-sp-green rounded px-1.5 py-0.5 flex-shrink-0">
              NEW
            </span>
          )}
        </button>
      </div>

      {/* Search + View toggle */}
      <div className="flex items-center justify-between px-4 pb-2 flex-shrink-0">
        <button className="w-8 h-8 flex items-center justify-center text-sp-muted hover:text-white transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 text-sp-muted text-xs">
          <span>Recents</span>
          <List className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Library list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {LIBRARY_ITEMS.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-sp-hover transition-colors group"
          >
            <div
              className={`w-10 h-10 flex-shrink-0 overflow-hidden flex items-center justify-center text-white text-sm font-bold ${
                item.isPlaylist ? 'rounded-sm' : 'rounded-full'
              }`}
              style={{ backgroundColor: item.color }}
            >
              {images[item.id]
                ? <img src={images[item.id]} alt={item.name} className="w-full h-full object-cover" />
                : item.initials
              }
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm text-white truncate font-medium">{item.name}</p>
              <p className="text-xs text-sp-muted truncate">{item.type}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
