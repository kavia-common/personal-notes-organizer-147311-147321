import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import Auth from "./components/Auth";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./style.css";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  // Main app layout
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Show Auth only if not logged in
  if (!isAuthenticated) {
    return (
      <div className="centered-wrapper">
        <Auth />
      </div>
    );
  }
  return (
    <div className="main-layout">
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="content-area">
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="notes-section">
          <NotesList
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            setSelectedNote={setSelectedNote}
            selectedNote={selectedNote}
          />
          <NoteEditor
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Wrap the app with the AuthProvider to enable authentication context state
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
