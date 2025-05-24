import React, { useState } from 'react';
import { usestate, useEffect } from "react"; 
import "./Note.css";

function App() {
    const [notes, setNotes] = useState(() => {  
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

const [noteTitle, setNoteTitle] = useState(""); 
const [noteText, setNoteText] = useState(""); 
const [search, setSearch] = useState("");

useEffect(() => {
localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);

const addNote = () => {
  if (noteTitle.trim() === "" || noteText.trim() === "") return;

const newNote = { 
id: Date.now(), 
title: noteTitle,
text: noteText,
};

setNotes ([newNote, ...notes]);
setNoteTitle("");
setNoteText("");
};

const deleteNote = (id) => {
    setNotes (notes.filter((note) => note.id == id));
};

const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes (search.toLowerCase())
);

return (
<div className="app">
<h1>Notes App</h1>

<input
type="text"
placeholder="Search by title..."
value={search}
onChange={(e) => setsearch(e.target.value)} 
className="search-input"
/>

<div className="note-form">
<input
type="text"
placeholder="Note title..."
value={noteTitle}
onChange={(e) => setNoteTitle(e.target.value)}
    />

<textarea
className="note"
placeholder="write your note..."
value={noteText}
onChange={(e) => setNoteText(e.target.value)}
/>
<button onClick={addNote}>Add</button>
</div>

<div className="notes-container">
{filteredNotes.map((note) => (
<div key={note.id} className="note"> 
  <h3>{note.title}</h3>
<p>{note.text}</p>
<button className="delete-btn" onclick={() => deleteNote (note.id)}>
&times; 
</button>
</div>
))}

{filteredNotes.length === 0 && <p className="empty">No notes found.</p>}
</div>
</div>
);
}

export default App;