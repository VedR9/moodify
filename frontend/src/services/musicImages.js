const CACHE = new Map()

async function iTunesSearch(term, entity, limit = 1) {
  const key = `${term}__${entity}`
  if (CACHE.has(key)) return CACHE.get(key)

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=${limit}&media=music`
    const res = await fetch(url)
    const data = await res.json()
    CACHE.set(key, data.results || [])
    return data.results || []
  } catch {
    return []
  }
}

function upscale(url, size = 400) {
  if (!url) return null
  return url.replace(/\d+x\d+bb\.jpg$/, `${size}x${size}bb.jpg`)
}

export async function getArtistImage(artistName) {
  // Try artist entity first
  let results = await iTunesSearch(artistName, 'musicArtist')
  if (results[0]?.artworkUrl100) return upscale(results[0].artworkUrl100, 300)

  // Fallback: get artwork from their most popular song
  results = await iTunesSearch(artistName, 'song')
  return upscale(results[0]?.artworkUrl100, 300) || null
}

export async function getAlbumArt(trackName, artistName) {
  const query = `${trackName} ${artistName}`
  let results = await iTunesSearch(query, 'song')
  if (results[0]?.artworkUrl100) return upscale(results[0].artworkUrl100, 600)

  // Fallback: artist name only
  results = await iTunesSearch(artistName, 'song')
  return upscale(results[0]?.artworkUrl100, 600) || null
}

export async function enrichTracksWithImages(tracks) {
  const enriched = await Promise.all(
    tracks.map(async (track) => {
      const imageUrl = await getAlbumArt(track.track, track.artist)
      return { ...track, imageUrl }
    })
  )
  return enriched
}
