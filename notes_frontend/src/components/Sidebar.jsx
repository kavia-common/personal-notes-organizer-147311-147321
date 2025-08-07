import React, { useState, useEffect } from "react";

// Dummy categories
const defaultCategories = ["All", "Personal", "Work", "Ideas"];

// PUBLIC_INTERFACE
export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState("");

  // Add category
  const handleAdd = (e) => {
    e.preventDefault();
    if (
      newCategory &&
      !categories.includes(newCategory.trim()) &&
      newCategory.trim() !== ""
    ) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  // Remove category
  const handleDelete = (cat) => {
    if (
      cat !== "All" &&
      window.confirm(`Delete category "${cat}"? Notes will remain uncategorized.`)
    ) {
      setCategories(categories.filter((c) => c !== cat));
      if (selectedCategory === cat) setSelectedCategory("All");
    }
  };

  return (
    <nav className="sidebar">
      <h3 className="sidebar-header">Categories</h3>
      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat}
            className={
              "category-item" +
              (selectedCategory === cat ? " selected" : "")
            }
          >
            <button
              className="category-btn"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
            {cat !== "All" && (
              <button
                className="delete-category"
                onClick={() => handleDelete(cat)}
                title="Delete category"
                tabIndex={-1}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
      <form className="add-category-form" onSubmit={handleAdd}>
        <input
          className="text-input"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add category"
          maxLength={24}
        />
        <button type="submit" className="mini-btn">
          +
        </button>
      </form>
    </nav>
  );
}
