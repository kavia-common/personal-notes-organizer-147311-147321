import React from "react";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function TopBar({ searchTerm, setSearchTerm }) {
  const { logout } = useAuth();

  return (
    <header className="topbar">
      <input
        className="search-bar"
        type="search"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="secondary-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
}
