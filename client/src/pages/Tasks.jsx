import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { taskApi } from "../api.js";
import TaskList from "../components/TaskList.jsx";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    taskApi.list({ search, status, priority })
      .then((data) => { if (active) { setTasks(data); setError(""); } })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, status, priority]);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try { await taskApi.remove(id); setTasks((current) => current.filter((task) => task.id !== id)); }
    catch (err) { setError(err.message); }
  }

  async function handleStatusChange(id, nextStatus) {
    try {
      await taskApi.update(id, { status: nextStatus });
      setTasks((current) => current.map((task) => task.id === id ? { ...task, status: nextStatus, updatedAt: new Date().toISOString() } : task));
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="page">
      <section className="page-heading-row"><div><p className="eyebrow">TASK ORGANIZER</p><h1>All tasks</h1><p className="muted">Search, filter, and manage everything on your list.</p></div><Link to="/tasks/new" className="button button-primary">＋ New task</Link></section>
      <section className="filters" aria-label="Task filters">
        <div className="search-box"><span>⌕</span><input aria-label="Search tasks" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option><option value="PENDING">Pending</option><option value="IN_PROGRESS">In Progress</option><option value="COMPLETED">Completed</option></select>
        <select aria-label="Filter by priority" value={priority} onChange={(e) => setPriority(e.target.value)}><option value="">All priorities</option><option value="HIGH">High priority</option><option value="MEDIUM">Medium priority</option><option value="LOW">Low priority</option></select>
        {(search || status || priority) && <button className="button button-quiet" onClick={() => { setSearch(""); setStatus(""); setPriority(""); }}>Clear filters</button>}
      </section>
      {error && <div className="alert alert-error" role="alert">{error}</div>}
      <div className="results-line">{loading ? "Loading tasks…" : `${tasks.length} task${tasks.length === 1 ? "" : "s"} found`}</div>
      {!loading && <TaskList tasks={tasks} onDelete={handleDelete} onStatusChange={handleStatusChange} />}
    </div>
  );
}
