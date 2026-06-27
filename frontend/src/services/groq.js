const API_URL       = import.meta.env.VITE_API_URL        // HF Space URL (production)
const GROQ_API_KEY  = import.meta.env.VITE_GROQ_API_KEY   // local dev fallback

const SYSTEM_PROMPT = `You are Spotify's AI music discovery engine. A user has described what they want to feel or experience through music. Your job is to find them music they have almost certainly NOT heard before.

Rules:
- Return ONLY a valid JSON array. No markdown, no explanation, no text outside the array.
- Recommend exactly 7 tracks.
- Prioritise: lesser-known artists, album cuts, non-mainstream catalogue, world music, indie, ambient, jazz fusion, niche genres.
- AVOID: top 40 hits, Arijit Singh, Ed Sheeran, Drake, Taylor Swift, The Weeknd, or any artist with >50M monthly Spotify listeners unless the track is genuinely obscure.
- Each track must match the user's emotional/contextual intent precisely.
- The reason must be specific to the user's prompt — reference their exact words.

Return this exact JSON structure:
[
  {
    "track": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "year": 2021,
    "reason": "One sentence explaining exactly why this matches the user's stated mood or context, referencing their specific words",
    "tags": ["tag1", "tag2", "tag3"],
    "bg": "#1a1a2e"
  }
]

Use varied hex colors for bg — dark, moody colors that reflect the track energy.`

async function callViaBackend(prompt) {
  const res = await fetch(`${API_URL}/discover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  if (!res.ok) throw new Error(`Backend error: ${res.status}`)
  const data = await res.json()
  return data.tracks
}

async function callGroqDirect(prompt) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1500,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: prompt },
      ],
    }),
  })
  if (!res.ok) throw new Error(`Groq error: ${res.status}`)
  const data = await res.json()
  const content = data.choices[0].message.content.trim()
  const match = content.match(/\[[\s\S]*\]/)
  if (!match) throw new Error('No JSON array in response')
  return JSON.parse(match[0])
}

export async function discoverMusic(prompt) {
  if (API_URL) return callViaBackend(prompt)
  return callGroqDirect(prompt)
}
