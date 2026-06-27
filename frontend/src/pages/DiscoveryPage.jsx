import { useState, useRef, useEffect } from 'react'
import { Sparkles, Play, ExternalLink, ChevronDown, ChevronUp, RefreshCw, Clock } from 'lucide-react'
import { discoverMusic } from '../services/groq'
import { enrichTracksWithImages } from '../services/musicImages'

const MOOD_CHIPS = [
  { label: 'Deep focus', prompt: "I need to focus deeply on work — something instrumental, minimal, no distractions. Help me get into a flow state." },
  { label: 'Late night drive', prompt: "Late night drive alone, city lights, slightly melancholic but free. Music that makes the road feel cinematic." },
  { label: 'Winding down', prompt: "End of a long day. I want to decompress — something gentle, warm, acoustic or ambient, that eases me toward sleep." },
  { label: 'Hidden gems', prompt: "Surprise me. Give me incredible music I've absolutely never heard — something that makes me stop what I'm doing." },
  { label: 'Workout energy', prompt: "High energy workout. I need something that keeps me pushing — intense, driving, with momentum." },
  { label: 'Emotional release', prompt: "I want to feel something deep. Sad but beautiful — music that lets me process emotions without words explaining them." },
]

function EqBars() {
  return (
    <div className="flex items-end gap-1 h-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="eq-bar" style={{ animationDelay: `${(i - 1) * 0.15}s` }} />
      ))}
    </div>
  )
}

function TrackRow({ track, index, isExpanded, onToggle }) {
  const spotifySearch = `https://open.spotify.com/search/${encodeURIComponent(`${track.track} ${track.artist}`)}`

  return (
    <div className={`group transition-colors rounded-md ${isExpanded ? 'bg-sp-elevated' : 'hover:bg-sp-elevated'}`}>
      <div className="flex items-center gap-3 px-4 py-2.5 cursor-pointer" onClick={onToggle}>
        {/* Index / Play */}
        <div className="w-8 flex items-center justify-center flex-shrink-0">
          <span className="text-sm text-sp-muted group-hover:hidden">{index + 1}</span>
          <Play className="w-4 h-4 text-white fill-current hidden group-hover:block" />
        </div>

        {/* Album art */}
        <div
          className="w-10 h-10 rounded flex-shrink-0 overflow-hidden flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: track.bg || '#282828' }}
        >
          {track.imageUrl
            ? <img src={track.imageUrl} alt={track.track} className="w-full h-full object-cover" />
            : '♪'
          }
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{track.track}</p>
          <p className="text-sp-muted text-xs truncate hover:text-white cursor-pointer">{track.artist}</p>
        </div>

        {/* Tags */}
        <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
          {(track.tags || []).slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-sp-elevated text-sp-muted border border-sp-hover">
              {tag}
            </span>
          ))}
        </div>

        {/* Year */}
        <span className="text-sp-muted text-xs w-10 text-right flex-shrink-0 hidden sm:block">
          {track.year}
        </span>

        {/* Open in Spotify */}
        <a
          href={spotifySearch}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="w-8 h-8 flex items-center justify-center text-sp-muted hover:text-sp-green transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
          title="Open in Spotify"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Expand toggle */}
        <button className="w-8 h-8 flex items-center justify-center text-sp-muted hover:text-white transition-colors flex-shrink-0">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded reason */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 flex items-start gap-3">
          <div className="w-8 flex-shrink-0" />
          <div className="w-10 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 bg-[#1a3a24] rounded-lg px-4 py-3 border border-sp-green/20">
              <Sparkles className="w-3.5 h-3.5 text-sp-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/80 leading-relaxed">{track.reason}</p>
            </div>
            <div className="mt-2 text-xs text-sp-muted">{track.album} · {track.year}</div>
          </div>
          <a
            href={spotifySearch}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sp-muted/40 text-white text-xs font-semibold hover:border-white transition-colors flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current text-sp-green" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Open in Spotify
          </a>
        </div>
      )}
    </div>
  )
}

export default function DiscoveryPage() {
  const [step, setStep] = useState('input')   // 'input' | 'loading' | 'results'
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState([])
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [refineQuery, setRefineQuery] = useState('')
  const textareaRef = useRef(null)

  const handleChip = (chip) => {
    setQuery(chip.prompt)
    if (textareaRef.current) textareaRef.current.focus()
  }

  const handleDiscover = async (overrideQuery) => {
    const q = overrideQuery || query
    if (!q.trim()) return
    setStep('loading')
    setError(null)
    setExpanded(null)
    try {
      const results = await discoverMusic(q)
      setTracks(results)
      setStep('results')
      // Enrich with real album art in background — update tracks as images arrive
      enrichTracksWithImages(results).then(enriched => setTracks(enriched))
    } catch (e) {
      setError(e.message)
      setStep('input')
    }
  }

  const handleRefine = () => {
    if (!refineQuery.trim()) return
    handleDiscover(`${query}. Additional context: ${refineQuery}`)
    setRefineQuery('')
  }

  const handleReset = () => {
    setStep('input')
    setQuery('')
    setTracks([])
    setError(null)
    setExpanded(null)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0d2818] via-sp-dark to-sp-dark pb-24 md:pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-sp-green rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">AI Discovery</h1>
          <p className="text-sp-muted text-sm mt-0.5">Tell it how you feel. Get music you've never heard.</p>
        </div>
        {step === 'results' && (
          <button
            onClick={handleReset}
            className="ml-auto flex items-center gap-2 text-sp-muted hover:text-white text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Start over
          </button>
        )}
      </div>

      <div className="px-6 pb-8">
        {/* INPUT STEP */}
        {step === 'input' && (
          <div className="max-w-2xl">
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="relative mb-4">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleDiscover() }}
                placeholder="Describe what you want to feel... e.g. I'm driving home after a long day, need something that starts intense and slowly winds down — nothing I've heard a hundred times"
                rows={4}
                className="w-full bg-sp-elevated border border-sp-hover rounded-xl px-5 py-4 text-white text-sm placeholder-sp-muted focus:outline-none focus:border-sp-green/50 resize-none leading-relaxed transition-colors"
              />
              <div className="absolute bottom-3 right-3 text-xs text-sp-subtle">
                ⌘ + Enter to discover
              </div>
            </div>

            {/* Mood chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {MOOD_CHIPS.map(chip => (
                <button
                  key={chip.label}
                  onClick={() => handleChip(chip)}
                  className="px-3 py-1.5 bg-sp-elevated hover:bg-sp-hover border border-sp-hover hover:border-sp-muted rounded-full text-white text-xs font-medium transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleDiscover()}
              disabled={!query.trim()}
              className="flex items-center gap-2 px-8 py-3 bg-sp-green hover:bg-sp-green-h disabled:bg-sp-hover disabled:text-sp-muted text-black font-bold rounded-full transition-colors text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Discover music
            </button>

            <p className="mt-4 text-xs text-sp-subtle">
              Powered by AI · Results tailored to your mood, not your history
            </p>
          </div>
        )}

        {/* LOADING STEP */}
        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <EqBars />
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-1">Reading your vibe...</p>
              <p className="text-sp-muted text-sm">Finding music you've never heard</p>
            </div>
            <div className="max-w-sm text-center">
              <p className="text-sp-subtle text-xs italic">"{query.slice(0, 120)}{query.length > 120 ? '...' : ''}"</p>
            </div>
          </div>
        )}

        {/* RESULTS STEP */}
        {step === 'results' && (
          <div>
            {/* User prompt recap */}
            <div className="mb-6 px-4 py-3 bg-sp-elevated rounded-lg border-l-2 border-sp-green">
              <p className="text-sp-muted text-xs mb-1">Your vibe</p>
              <p className="text-white text-sm leading-relaxed">{query}</p>
            </div>

            {/* Track list header */}
            <div className="flex items-center justify-between mb-2 px-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sp-green" />
                <span className="text-white text-sm font-semibold">{tracks.length} tracks picked for you</span>
              </div>
              <div className="flex items-center gap-1 text-sp-muted text-xs">
                <Clock className="w-3 h-3" />
                <span>Click a track for the why</span>
              </div>
            </div>

            {/* Column labels */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-sp-elevated mb-1 text-sp-muted text-xs uppercase tracking-wider">
              <span className="w-8 text-center">#</span>
              <span className="w-10" />
              <span className="flex-1">Title</span>
              <span className="hidden md:block w-32">Tags</span>
              <span className="hidden sm:block w-10 text-right">Year</span>
              <span className="w-8" />
              <span className="w-8" />
            </div>

            {/* Tracks */}
            <div className="space-y-1 mb-8">
              {tracks.map((track, i) => (
                <TrackRow
                  key={i}
                  track={track}
                  index={i}
                  isExpanded={expanded === i}
                  onToggle={() => setExpanded(expanded === i ? null : i)}
                />
              ))}
            </div>

            {/* Refine input */}
            <div className="border-t border-sp-elevated pt-6">
              <p className="text-white font-semibold text-sm mb-3">Not quite right?</p>
              <div className="flex gap-3 max-w-xl">
                <input
                  value={refineQuery}
                  onChange={e => setRefineQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRefine()}
                  placeholder="More upbeat... No jazz... Something with vocals..."
                  className="flex-1 bg-sp-elevated border border-sp-hover rounded-full px-5 py-2.5 text-white text-sm placeholder-sp-muted focus:outline-none focus:border-sp-green/50 transition-colors"
                />
                <button
                  onClick={handleRefine}
                  disabled={!refineQuery.trim()}
                  className="px-5 py-2.5 bg-sp-green hover:bg-sp-green-h disabled:bg-sp-hover disabled:text-sp-muted text-black font-bold rounded-full text-sm transition-colors flex-shrink-0"
                >
                  Refine
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
