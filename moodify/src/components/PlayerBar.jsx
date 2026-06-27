import {
  Shuffle, SkipBack, Play, Pause, SkipForward, Repeat,
  Heart, Maximize2, Volume2, ListMusic, MonitorSpeaker
} from 'lucide-react'
import { useState } from 'react'

const NOW_PLAYING = {
  title: 'Tum Hi Ho',
  artist: 'Arijit Singh',
  color: '#c0392b',
  initials: 'TH',
}

export default function PlayerBar() {
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div className="h-[90px] bg-[#181818] border-t border-[#282828] flex items-center px-4 flex-shrink-0 z-10">
      {/* Left: Now playing */}
      <div className="flex items-center gap-3 w-[280px] min-w-[180px]">
        <div
          className="w-14 h-14 rounded flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: NOW_PLAYING.color }}
        >
          {NOW_PLAYING.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate hover:underline cursor-pointer">
            {NOW_PLAYING.title}
          </p>
          <p className="text-xs text-sp-muted truncate hover:text-white cursor-pointer hover:underline">
            {NOW_PLAYING.artist}
          </p>
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className={`ml-2 flex-shrink-0 transition-colors ${liked ? 'text-sp-green' : 'text-sp-muted hover:text-white'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
        <button className="flex-shrink-0 text-sp-muted hover:text-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Center: Controls */}
      <div className="flex-1 flex flex-col items-center gap-1 max-w-[600px] mx-auto">
        <div className="flex items-center gap-5">
          <button className="text-sp-muted hover:text-white transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button className="text-sp-muted hover:text-white transition-colors">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {playing
              ? <Pause className="w-4 h-4 text-black fill-current" />
              : <Play className="w-4 h-4 text-black fill-current ml-0.5" />
            }
          </button>
          <button className="text-sp-muted hover:text-white transition-colors">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button className="text-sp-muted hover:text-white transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-sp-muted w-10 text-right">1:23</span>
          <div className="flex-1 relative h-1 group">
            <div className="w-full h-full bg-[#535353] rounded-full">
              <div className="h-full bg-white rounded-full group-hover:bg-sp-green transition-colors" style={{ width: '28%' }} />
            </div>
          </div>
          <span className="text-[11px] text-sp-muted w-10">4:52</span>
        </div>
      </div>

      {/* Right: Volume + extras */}
      <div className="flex items-center gap-3 w-[280px] min-w-[180px] justify-end">
        <button className="text-sp-muted hover:text-white transition-colors">
          <ListMusic className="w-4 h-4" />
        </button>
        <button className="text-sp-muted hover:text-white transition-colors">
          <MonitorSpeaker className="w-4 h-4" />
        </button>
        <Volume2 className="w-4 h-4 text-sp-muted" />
        <div className="w-24 relative h-1 group">
          <div className="w-full h-full bg-[#535353] rounded-full">
            <div className="h-full bg-white rounded-full group-hover:bg-sp-green transition-colors" style={{ width: '65%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
