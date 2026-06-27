---
title: Moodify API
emoji: 🎵
colorFrom: green
colorTo: black
sdk: docker
pinned: false
---

# Moodify AI Discovery API

FastAPI backend for the Moodify music discovery feature. Accepts a natural language mood/context prompt and returns 7 curated track recommendations via Groq LLaMA.

## Endpoint

`POST /discover`
```json
{ "prompt": "late night drive, melancholic but free" }
```

Returns:
```json
{
  "tracks": [
    {
      "track": "...",
      "artist": "...",
      "album": "...",
      "year": 2021,
      "reason": "...",
      "tags": ["..."],
      "bg": "#1a1a2e"
    }
  ]
}
```

## Environment Variables

Set `GROQ_API_KEY` in Hugging Face Space secrets.
