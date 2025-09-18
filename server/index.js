// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// list songs
app.get('/api/songs', (req, res) => {
  const sql = `SELECT id, title, artist, link, votes, created_at
               FROM songs
               ORDER BY votes DESC, datetime(created_at) DESC`;
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// add song
app.post('/api/songs', (req, res) => {
  const { title, artist, link } = req.body || {};
  if (!title || !artist) return res.status(400).json({ error: 'title and artist required' });

  const stmt = db.prepare('INSERT INTO songs (title, artist, link) VALUES (?, ?, ?)');
  stmt.run(title.trim(), artist.trim(), link || null, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM songs WHERE id = ?', [this.lastID], (e, row) => {
      if (e) return res.status(500).json({ error: e.message });
      res.status(201).json(row);
    });
  });
});

// vote up
app.post('/api/songs/:id/vote', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE songs SET votes = votes + 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM songs WHERE id = ?', [id], (e, row) => {
      if (e) return res.status(500).json({ error: e.message });
      if (!row) return res.status(404).json({ error: 'not found' });
      res.json(row);
    });
  });
});

// delete (optional)
app.delete('/api/songs/:id', (req, res) => {
  db.run('DELETE FROM songs WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes > 0 });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
