# Server (Express + SQLite)

## Setup
```bash
npm i
npm run dev
```
Runs at `http://localhost:4000`.

### Environment
- `PORT` (optional) — default 4000
- `CORS_ORIGIN` (optional) — default `*`

### Endpoints
- `GET /api/songs` — list songs sorted by votes desc, then newest
- `POST /api/songs` — create song `{ title, artist, link? }`
- `POST /api/songs/:id/vote` — vote up a song
- `DELETE /api/songs/:id` — delete a song (optional)
