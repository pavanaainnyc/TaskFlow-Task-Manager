import React from 'react';
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" className="brand" aria-label="TaskFlow home">
          <span className="brand-mark">✓</span><span>TaskFlow</span>
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/tasks">All Tasks</NavLink>
          <NavLink to="/tasks/new" className="nav-add">+ New Task</NavLink>
        </nav>
      </div>
    </header>
  );
}
