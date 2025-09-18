export default function SongItem({ song, onVote, onRemove }) {
  const { title, artist, link, votes } = song
  const host = (() => {
    try { return link ? new URL(link).host : '' } catch { return '' }
  })()

  return (
    <li className="card">
      <div className="meta">
        <div className="title">{title}</div>
        <div className="artist">by {artist}</div>
        {link && <a className="link" href={link} target="_blank" rel="noreferrer">{host || 'Open link'}</a>}
      </div>

      <div className="actions">
        <button className="vote" onClick={onVote}>▲ {votes}</button>
        <button className="delete" onClick={onRemove}>Delete</button>
      </div>
    </li>
  )
}
