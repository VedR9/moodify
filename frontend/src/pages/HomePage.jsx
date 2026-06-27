import { Play, Sparkles, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArtistImage, getAlbumArt } from '../services/musicImages'

const QUICK_PICKS = [
  { id: 1, name: 'Arijit Singh Mix',    artist: 'Arijit Singh',    color: '#c0392b' },
  { id: 2, name: 'A.R. Rahman Mix',     artist: 'A.R. Rahman',     color: '#8e44ad' },
  { id: 3, name: 'Mithoon Mix',         artist: 'Mithoon',         color: '#2980b9' },
  { id: 4, name: 'Udit Narayan Mix',    artist: 'Udit Narayan',    color: '#27ae60' },
  { id: 5, name: 'Sunidhi Chauhan Mix', artist: 'Sunidhi Chauhan', color: '#e67e22' },
  { id: 6, name: 'Shreya Ghoshal Mix',  artist: 'Shreya Ghoshal',  color: '#c0392b' },
]

const RECOMMENDED = [
  { id: 1, name: 'Kalank',          sub: 'Pritam',           track: 'Kalank',         artist: 'Pritam',          gradient: 'from-red-900 to-orange-900' },
  { id: 2, name: 'Ramaiya Vastavaiya', sub: 'Sachin-Jigar',  track: 'Ramaiya Vastavaiya', artist: 'Sachin-Jigar', gradient: 'from-yellow-900 to-red-900' },
  { id: 3, name: 'Tu Hi Hai Aashiqui', sub: 'Various',       track: 'Tu Hi Hai Aashiqui', artist: 'Arijit Singh', gradient: 'from-pink-900 to-purple-900' },
  { id: 4, name: 'All Out Hindi 10s',  sub: 'Various',       track: 'Tum Hi Ho',      artist: 'Arijit Singh',    gradient: 'from-blue-900 to-indigo-900' },
  { id: 5, name: 'Love Anthems',       sub: 'Sonu Nigam',    track: 'Kal Ho Naa Ho',  artist: 'Sonu Nigam',      gradient: 'from-purple-900 to-pink-900' },
  { id: 6, name: 'Jhoom Barabar Jhoom', sub: 'SEL',          track: 'Jhoom Barabar Jhoom', artist: 'Shankar Ehsaan Loy', gradient: 'from-green-900 to-teal-900' },
]

const TRENDING = [
  { id: 1, name: 'Mashooqa',     sub: 'Pritam',           track: 'Nashaa',           artist: 'Pritam',         gradient: 'from-orange-800 to-red-900' },
  { id: 2, name: 'Tere Paas Main', sub: 'A.R. Rahman',   track: 'Kun Faya Kun',     artist: 'A.R. Rahman',    gradient: 'from-teal-900 to-blue-900' },
  { id: 3, name: 'Ban Ja Tu',    sub: 'Badshah',          track: 'Jugnu',            artist: 'Badshah',        gradient: 'from-gray-700 to-gray-900' },
  { id: 4, name: 'Low Fade',     sub: 'Karan Aujla',      track: 'Softly',           artist: 'Karan Aujla',    gradient: 'from-slate-700 to-slate-900' },
  { id: 5, name: 'Arz Kiya Hai', sub: 'Anuv Jain',        track: 'Baarishein',       artist: 'Anuv Jain',      gradient: 'from-red-800 to-orange-800' },
  { id: 6, name: 'Udi Udi',      sub: 'Anurag Saikia',    track: 'Udi Udi Jaye',     artist: 'Anurag Saikia',  gradient: 'from-violet-800 to-purple-900' },
]

const ARTISTS = [
  { id: 1, name: 'Pritam',           color: '#7f1d1d' },
  { id: 2, name: 'A.R. Rahman',      color: '#1e3a5f' },
  { id: 3, name: 'Arijit Singh',     color: '#3d2b1f' },
  { id: 4, name: 'Sachin-Jigar',     color: '#14532d' },
  { id: 5, name: 'Vishal-Shekhar',   color: '#3b0764' },
  { id: 6, name: 'Atif Aslam',       color: '#422006' },
  { id: 7, name: 'Anirudh Ravichander', color: '#1c1917' },
]

function SectionHeader({ title, showAll = true }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-white hover:underline cursor-pointer">{title}</h2>
      {showAll && (
        <button className="text-xs font-bold text-sp-muted hover:text-white transition-colors uppercase tracking-wider">
          Show all
        </button>
      )}
    </div>
  )
}

function CardGrid({ children }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {children}
    </div>
  )
}

function MusicCard({ item, imageUrl }) {
  return (
    <div className="group bg-sp-card hover:bg-sp-elevated transition-colors rounded-lg p-4 cursor-pointer">
      <div className={`relative w-full pb-[100%] rounded mb-3 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
        {imageUrl
          ? <img src={imageUrl} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
          : <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold opacity-30 select-none">♪</div>
        }
        <button className="absolute bottom-2 right-2 w-10 h-10 bg-sp-green rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all z-10">
          <Play className="w-4 h-4 text-black fill-current ml-0.5" />
        </button>
      </div>
      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
      <p className="text-sp-muted text-xs mt-1 truncate">{item.sub}</p>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const [cardImages, setCardImages] = useState({})    // key: `rec-{id}` or `trend-{id}`
  const [artistImages, setArtistImages] = useState({}) // key: artist id
  const [quickImages, setQuickImages] = useState({})   // key: quick pick id

  useEffect(() => {
    // Recommended cards
    RECOMMENDED.forEach(async (item) => {
      const url = await getAlbumArt(item.track, item.artist)
      if (url) setCardImages(prev => ({ ...prev, [`rec-${item.id}`]: url }))
    })
    // Trending cards
    TRENDING.forEach(async (item) => {
      const url = await getAlbumArt(item.track, item.artist)
      if (url) setCardImages(prev => ({ ...prev, [`trend-${item.id}`]: url }))
    })
    // Quick picks (artist images)
    QUICK_PICKS.forEach(async (item) => {
      const url = await getArtistImage(item.artist)
      if (url) setQuickImages(prev => ({ ...prev, [item.id]: url }))
    })
    // Popular artists
    ARTISTS.forEach(async (artist) => {
      const url = await getArtistImage(artist.name)
      if (url) setArtistImages(prev => ({ ...prev, [artist.id]: url }))
    })
  }, [])

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1a1a1a] via-sp-dark to-sp-dark pb-8 md:pb-8 pb-24">
      {/* Top filter */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-[#1a1a1a] to-transparent pt-4 pb-2 px-6">
        <div className="flex gap-2 mb-2">
          <button className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-semibold">All</button>
          <button className="px-4 py-1.5 bg-sp-elevated text-white rounded-full text-sm font-semibold hover:bg-sp-hover transition-colors">Music</button>
          <button className="px-4 py-1.5 bg-sp-elevated text-white rounded-full text-sm font-semibold hover:bg-sp-hover transition-colors">Podcasts</button>
        </div>
      </div>

      <div className="px-6">
        {/* AI Discovery Feature Card */}
        <div
          onClick={() => navigate('/discover')}
          className="relative overflow-hidden rounded-xl mb-8 cursor-pointer group"
          style={{ background: 'linear-gradient(135deg, #006437 0%, #1DB954 50%, #00c2ff 100%)' }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <div className="relative z-10 flex items-center justify-between p-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-black" />
                <span className="text-black text-xs font-bold uppercase tracking-widest">New Feature</span>
              </div>
              <h2 className="text-black text-2xl font-bold mb-1">AI Discovery</h2>
              <p className="text-black/70 text-sm max-w-xs">
                Tell us how you feel. Get music you've never heard before — with a reason for every pick.
              </p>
              <button className="mt-4 px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold flex items-center gap-2 group-hover:scale-105 transition-transform">
                Try it now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2 opacity-60">
              {['✦ Instrumental', '✦ Hidden gems', '✦ Your vibe'].map(t => (
                <span key={t} className="text-black text-sm font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Picks */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{greeting}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {QUICK_PICKS.map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-3 bg-sp-elevated hover:bg-sp-hover transition-colors rounded-md overflow-hidden group"
              >
                <div
                  className="w-12 h-12 flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {quickImages[item.id]
                    ? <img src={quickImages[item.id]} alt={item.name} className="w-full h-full object-cover" />
                    : item.artist[0]
                  }
                </div>
                <span className="text-white text-sm font-semibold truncate pr-2">{item.name}</span>
                <div className="ml-auto mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-sp-green rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-black fill-current ml-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* To get you started */}
        <div className="mb-8">
          <SectionHeader title="To get you started" />
          <CardGrid>
            {RECOMMENDED.map(item => (
              <MusicCard key={item.id} item={item} imageUrl={cardImages[`rec-${item.id}`]} />
            ))}
          </CardGrid>
        </div>

        {/* Trending */}
        <div className="mb-8">
          <SectionHeader title="Trending songs" />
          <CardGrid>
            {TRENDING.map(item => (
              <MusicCard key={item.id} item={item} imageUrl={cardImages[`trend-${item.id}`]} />
            ))}
          </CardGrid>
        </div>

        {/* Popular artists */}
        <div className="mb-8">
          <SectionHeader title="Popular artists" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {ARTISTS.map(artist => (
              <div key={artist.id} className="group cursor-pointer text-center bg-sp-card hover:bg-sp-elevated transition-colors rounded-lg p-3">
                <div
                  className="w-full pb-[100%] relative rounded-full mb-3 overflow-hidden"
                  style={{ backgroundColor: artist.color }}
                >
                  {artistImages[artist.id]
                    ? <img src={artistImages[artist.id]} alt={artist.name} className="absolute inset-0 w-full h-full object-cover" />
                    : <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-40">{artist.name[0]}</div>
                  }
                  <button className="absolute bottom-1 right-1 w-8 h-8 bg-sp-green rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all z-10">
                    <Play className="w-3 h-3 text-black fill-current ml-0.5" />
                  </button>
                </div>
                <p className="text-white text-xs font-semibold truncate">{artist.name}</p>
                <p className="text-sp-muted text-xs">Artist</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
