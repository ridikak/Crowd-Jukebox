import { useEffect, useState, useMemo } from 'react'
import SongForm from './components/SongForm.jsx'
import SongList from './components/SongList.jsx'
import './styles/base.css'
import './styles/board.css'

const API = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000'

export default function App() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const sortedSongs = useMemo(() => {
    return [...songs].sort((a, b) => {
      if (b.votes !== a.votes) return b.votes - a.votes
      return new Date(b.created_at) - new Date(a.created_at)
    })
  }, [songs])

  async function fetchSongs() {
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/songs`)
      const data = await res.json()
      setSongs(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Failed to load songs. Is the API running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSongs() }, [])

  async function addSong(payload) {
    setError('')
    try {
      const res = await fetch(`${API}/api/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Bad response')
      await fetchSongs()
    } catch (e) {
      setError('Unable to add song.')
    }
  }

  async function vote(id) {
    // optimistic
    setSongs(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s))
    try {
      await fetch(`${API}/api/songs/${id}/vote`, { method: 'POST' })
    } finally {
      fetchSongs()
    }
  }

  async function remove(id) {
    if (!confirm('Delete this song?')) return
    await fetch(`${API}/api/songs/${id}`, { method: 'DELETE' })
    fetchSongs()
  }

  return (
    <div className="wrap">
      <h1>🎵 Crowd Jukebox</h1>
      <p className="subtitle">Add songs and vote your favorites to the top.</p>

      <SongForm onAdd={addSong} />

      {error && <div className="error">{error}</div>}
      {loading ? <div className="loading">Loading…</div> : (
        <SongList songs={sortedSongs} onVote={vote} onRemove={remove} />
      )}

      <footer>Made with React, Express &amp; SQLite — no extra fluff.</footer>
    </div>
  )
}
