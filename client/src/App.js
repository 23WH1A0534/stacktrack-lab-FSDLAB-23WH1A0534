import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Divider } from '@mui/material';
import NotesTable from './components/NotesTable';
import { fetchNotes } from './api';
import { set } from 'mongoose';

function App() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = 'http://localhost:5004/api/notes';

  useEffect(() => {
    fetchNotes()
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const get = async () => setNotes(await fetch(API).then(res => res.json()));

  const add = async () => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    get();
  };

  const searchNotes = async () => setNotes(await fetch(`${API}/notes?title=${search}`).then(res => res.json()));


  return (
    // <Container maxWidth="lg" sx={{ mt: 4 }}>
    //   <Typography variant="h4" component="h1" gutterBottom>
    //     QuickNotes Pro
    //   </Typography>

    //   {loading && (
    //     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    //       <CircularProgress />
    //     </Box>
    //   )}

    //   {error && <Alert severity="error">{error}</Alert>}


    //   {!loading && !error && <NotesTable notes={notes} />}
    //   <Divider sx={{ my: 4 }} />
    //   {/* TODO: Implement the UI for the corresponding question set */}
    // </Container>
    <div>
      <h1>QuickNotes Pro</h1>
      <input placeholder='Title' value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
      <textarea placeholder='Content' value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} />
      <input placeholder='Category' value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} />
      <button onClick={add}>Add Note</button>

      <input placeholder='Search by title' value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={searchNotes}>Search</button>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note._id}>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>{note.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
