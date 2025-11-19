const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// notes fetch karne ke liye
router.get('/', auth, async (req, res) => {
  const { q } = req.query;
  const filter = { user: req.user._id };
  if (q) filter.$or = [ { title: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }, { tags: new RegExp(q, 'i') } ];
  const notes = await Note.find(filter).sort({ updatedAt: -1 });
  res.json(notes);
});

// create karne ke liye
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const note = new Note({ user: req.user._id, title, content, tags });
  await note.save();
  res.status(201).json(note);
});


router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (String(note.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

  ['title','content','tags'].forEach(field => { if (req.body[field] !== undefined) note[field] = req.body[field]; });
  await note.save();
  res.json(note);
});

// delete karne ke liye


router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (String(note.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });
  await note.deleteOne();
  res.json({ message: 'Deleted' });
});

module.exports = router;
