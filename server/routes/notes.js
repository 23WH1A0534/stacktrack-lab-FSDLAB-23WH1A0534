const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
// const express = require('express');
// const Note = require('../models/Note');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const data = await Note.find();
//   res.json(data);
// });

// router.post('/', async (req, res) => {
//   const { title, content, category } = req.body;
//   const newNote = new Note({ title, content, category });
//   await newNote.save();
//   res.json(newNote);
// });

// router.get('/notes', async (req, res) => {
//   const data = await Note.find({
//     title: { $regex: req.query.title || '', $options: 'i' },
//     category: { $regex: req.query.category || '', $options: 'i' },    
//   });
//   res.json(data);
// });

// module.exports = router;
