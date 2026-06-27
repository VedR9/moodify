import os
import re
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI(title="Moodify AI Discovery API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """You are Spotify's AI music discovery engine. A user has described what they want to feel or experience through music. Your job is to find them music they have almost certainly NOT heard before.

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

Use varied hex colors for bg — dark, moody colors that reflect the track energy."""


class DiscoverRequest(BaseModel):
    prompt: str


@app.get("/")
def health():
    return {"status": "ok", "service": "Moodify AI Discovery API"}


@app.post("/discover")
async def discover(req: DiscoverRequest):
    api_key = os.environ.get("GROQ_API_KEY", "")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")

    client = Groq(api_key=api_key)

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1500,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user",   "content": req.prompt},
            ],
        )
        content = completion.choices[0].message.content.strip()

        match = re.search(r"\[[\s\S]*\]", content)
        if not match:
            raise HTTPException(status_code=502, detail="Model returned unexpected format")

        tracks = json.loads(match.group(0))
        return {"tracks": tracks}

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=502, detail=f"JSON parse error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
