# API Reference

This document describes the local API server used by the portfolio app (`server.js`).

## Base Information

- Runtime: Node + Express
- Local server port: `3001`
- Frontend dev proxy: `/api/* -> http://localhost:3001` (configured in `vite.config.ts`)
- Content type: JSON for API endpoints

---

## Authentication and Environment

Required `.env` for API server:

```env
GITHUB_TOKEN=your_github_models_token
```

Used by:

- `POST /api/chat`

If `GITHUB_TOKEN` is missing, chatbot calls fail.

---

## Endpoint: POST `/api/chat`

Generate a model response for the portfolio assistant.

### Request Body

```json
{
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user", "content": "Tell me about your AI projects" }
  ]
}
```

### Validation

- `messages` is required.
- Missing `messages` returns `400`.

### Success Response

Pass-through response from GitHub Models chat-completions API.

Example shape:

```json
{
  "id": "...",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "..."
      }
    }
  ]
}
```

### Error Responses

- `400` if `messages` missing
- `500` for upstream/model/server errors

### Curl Example

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role":"system","content":"You are a portfolio assistant."},
      {"role":"user","content":"Summarize internships"}
    ]
  }'
```

---

## Endpoint: GET `/api/github-achievements`

Fetches and parses public GitHub achievement badges.

### Source

- Scrapes: `https://github.com/m2l33k?tab=achievements`

### Success Response

```json
[
  {
    "name": "Pull Shark",
    "image": "https://..."
  },
  {
    "name": "YOLO",
    "image": "https://..."
  }
]
```

### Error Responses

- `500` if scraping/fetch/parsing fails

### Curl Example

```bash
curl http://localhost:3001/api/github-achievements
```

---

## Endpoint: GET `/api/tryhackme-stats`

Fetches TryHackMe public profile stats.

### Source

- `https://tryhackme.com/api/v2/public-profile?username=RootKeeper`

### Success Response

Returns upstream JSON from TryHackMe public profile API.

Common fields consumed by UI:

- `status`
- `data.rank`
- `data.topPercentage`
- `data.completedRoomsNumber`
- `data.badgesNumber`
- `data.level`
- `data.points`

### Error Responses

- `500` if upstream call fails

### Curl Example

```bash
curl http://localhost:3001/api/tryhackme-stats
```

---

## Frontend Integration Points

- `src/pages/Chatbot.tsx` -> `POST /api/chat`
- `src/components/portfolio/GitHubAchievements.tsx` -> `GET /api/github-achievements`
- `src/components/portfolio/TryHackMeStats.tsx` -> `GET /api/tryhackme-stats`

---

## Operational Notes

- In development, start with `npm run dev` (runs Vite + server concurrently).
- Ensure network access to external providers (GitHub, TryHackMe).
- For production hardening, consider response caching and rate limiting.
