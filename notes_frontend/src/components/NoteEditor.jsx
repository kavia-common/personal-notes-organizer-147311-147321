import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
export default function NoteEditor({
  selectedNote,
  setSelectedNote,
  selectedCategory,
}) {
  // Using local state to fake backend for now
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(selectedCategory);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (selectedNote && selectedNote.id) {
      // Editing existing note
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
      setCategory(selectedNote.category || "Personal");
      setEditing(true);
    } else {
      // New note
      setTitle("");
      setContent("");
      setCategory(selectedCategory !== "All" ? selectedCategory : "Personal");
      setEditing(false);
    }
  }, [selectedNote, selectedCategory]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    // Save note logic (POST/PUT to API)...
    setSelectedNote(null); // Close editor
  };

  const handleDelete = () => {
    if (
      editing &&
      window.confirm("Delete this note? This action is irreversible.")
    ) {
      // Delete logic (DELETE to API)...
      setSelectedNote(null);
    }
  };

  if (!selectedNote) {
    return (
      <div className="note-editor note-editor-empty">
        <span>Select or create a note to get started.</span>
      </div>
    );
  }

  return (
    <form className="note-editor" onSubmit={handleSave}>
      <input
        className="note-title-input"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={64}
      />
      <textarea
        className="note-content-input"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        required
        maxLength={1000}
      />
      <div className="editor-row">
        <select
          value={category}
          className="category-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          {/* List of categories would come from context/store */}
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Ideas">Ideas</option>
        </select>
        {editing && (
          <button
            type="button"
            className="delete-btn"
            style={{ marginLeft: "auto" }}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <button className="primary-btn" type="submit">
          {editing ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
