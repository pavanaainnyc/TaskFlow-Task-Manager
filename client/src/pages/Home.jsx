import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { taskApi } from "../api.js";
import StatsCards from "../components/StatsCards.jsx";
import TaskList from "../components/TaskList.jsx";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try { setError(""); setTasks(await taskApi.list()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadTasks(); }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try { await taskApi.remove(id); await loadTasks(); }
    catch (err) { setError(err.message); }
  }

  async function handleStatusChange(id, status) {
    try {
      const task = tasks.find((item) => item.id === id);
      await taskApi.update(id, { status });
      setTasks((current) => current.map((item) => item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
    } catch (err) { setError(err.message); }
  }

  const recent = [...tasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div><p className="eyebrow">YOUR WORKSPACE</p><h1>Make room for <span>great work.</span></h1><p className="hero-copy">Plan your day, prioritize what matters, and keep every task moving forward.</p></div>
        <Link to="/tasks/new" className="button button-primary hero-button">＋ Create a task</Link>
      </section>
      {error && <div className="alert alert-error" role="alert">{error} <button onClick={loadTasks}>Retry</button></div>}
      {loading ? <div className="loading-state">Loading your workspace…</div> : <>
        <StatsCards tasks={tasks} />
        <section className="section-block">
          <div className="section-heading"><div><p className="eyebrow">STAY ON TRACK</p><h2>Recently updated</h2></div><Link to="/tasks" className="text-link">View all tasks →</Link></div>
          <TaskList tasks={recent} onDelete={handleDelete} onStatusChange={handleStatusChange} />
        </section>
      </>}
    </div>
  );
}
