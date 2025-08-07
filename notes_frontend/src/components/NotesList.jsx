import React, { useState, useEffect } from "react";

// Dummy data for illustration
const mockNotes = [
  {
    id: 1,
    title: "Welcome Note",
    content: "This is your first note!",
    category: "Personal",
    updated: new Date().toISOString(),
  },
];

// PUBLIC_INTERFACE
export default function NotesList({
  selectedCategory,
  searchTerm,
  setSelectedNote,
  selectedNote,
}) {
  // Ideally fetch notes from API, but using local state for demo
  const [notes, setNotes] = useState(mockNotes);

  // Filter notes by category and search
  const filteredNotes = notes.filter((n) => {
    const matchesCategory =
      selectedCategory === "All" || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // On mount if something is created/updated elsewhere, handle it

  return (
    <aside className="notes-list">
      <div className="notes-header">
        <h2>Notes</h2>
        <button
          className="accent-btn"
          onClick={() => setSelectedNote({})}
          style={{marginLeft: 'auto'}}
          title="New Note"
        >
          +
        </button>
      </div>
      <ul>
        {filteredNotes.length === 0 && (
          <li className="notes-empty">No notes found</li>
        )}
        {filteredNotes.map((n) => (
          <li
            key={n.id}
            className={
              "note-list-item" +
              (selectedNote && selectedNote.id === n.id ? " selected" : "")
            }
            onClick={() => setSelectedNote(n)}
            tabIndex={0}
            role="button"
          >
            <div>
              <span className="note-title">{n.title}</span>
              <span className="note-category">{n.category}</span>
            </div>
            <div className="note-date">
              {new Date(n.updated).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
