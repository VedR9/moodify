const BROWSE_CATEGORIES = [
  { name: 'Music',           gradient: 'from-pink-700 to-pink-900' },
  { name: 'Podcasts',        gradient: 'from-green-700 to-green-900' },
  { name: 'Live Events',     gradient: 'from-blue-700 to-blue-900' },
  { name: 'Made For You',    gradient: 'from-indigo-700 to-indigo-900' },
  { name: 'New Releases',    gradient: 'from-yellow-700 to-orange-900' },
  { name: 'Hindi',           gradient: 'from-orange-700 to-red-900' },
  { name: 'Pop',             gradient: 'from-purple-700 to-pink-900' },
  { name: 'Hip-Hop',         gradient: 'from-gray-700 to-gray-900' },
  { name: 'Chill',           gradient: 'from-teal-700 to-cyan-900' },
  { name: 'Workout',         gradient: 'from-red-700 to-red-900' },
  { name: 'Focus',           gradient: 'from-blue-800 to-indigo-900' },
  { name: 'Romance',         gradient: 'from-rose-700 to-pink-900' },
  { name: 'Sleep',           gradient: 'from-slate-700 to-slate-900' },
  { name: 'Trending',        gradient: 'from-amber-700 to-orange-900' },
  { name: 'Discover Weekly', gradient: 'from-sp-green to-green-900' },
  { name: 'Party',           gradient: 'from-violet-700 to-purple-900' },
]

import { useIsMobile } from '../hooks/useIsMobile'

export default function SearchPage() {
  const isMobile = useIsMobile()
  return (
    <div className={`flex-1 overflow-y-auto bg-sp-dark ${isMobile ? 'pb-24' : 'pb-8'}`}>
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-white mb-6">Browse all</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {BROWSE_CATEGORIES.map(cat => (
            <div
              key={cat.name}
              className={`relative h-20 rounded-lg overflow-hidden cursor-pointer bg-gradient-to-br ${cat.gradient} hover:scale-[1.02] transition-transform`}
            >
              <p className="absolute top-3 left-3 text-white font-bold text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
