import { useState } from 'react'

export default function SongForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [link, setLink] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!title.trim() || !artist.trim()) return
    onAdd({ title, artist, link })
    setTitle(''); setArtist(''); setLink('')
  }

  return (
    <form className="song-form" onSubmit={submit}>
      <input
        placeholder="Song title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        placeholder="Link (YouTube/Spotify) – optional"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
