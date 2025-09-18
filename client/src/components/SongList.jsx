import SongItem from './SongItem.jsx'

export default function SongList({ songs, onVote, onRemove }) {
  if (!songs.length) return <div className="empty">No songs yet. Be the first!</div>
  return (
    <ul className="board">
      {songs.map(s => (
        <SongItem key={s.id} song={s} onVote={() => onVote(s.id)} onRemove={() => onRemove(s.id)} />
      ))}
    </ul>
  )
}
