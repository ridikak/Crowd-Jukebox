# 🎵 Crowd Jukebox

Simple, cool full‑stack project with **React + CSS**, **Express**, and **SQLite** — no heavy libraries, no ORM, no state manager.

## Features
- Add songs (title, artist, optional link)
- Vote songs up
- Auto‑sorted by votes (then newest)
- Minimal stack: fetch API, plain CSS, Express, sqlite3

## Quick Start

### 1) Server
```bash
cd server
npm i
npm run dev   # starts on http://localhost:4000
```

### 2) Client
```bash
cd client
npm i
npm run dev   # Vite dev server (default http://localhost:5173)
```
> The client points to `http://localhost:4000` by default (see `VITE_API_BASE` in `client/.env.example`).

## Deploying
- Server can be deployed to Render/Railway; the SQLite file `jukebox.db` will be created on first run.
- Client can be deployed to Netlify/Vercel; set `VITE_API_BASE` to your server URL.

---

Made with ❤️ using React, Express & SQLite.
