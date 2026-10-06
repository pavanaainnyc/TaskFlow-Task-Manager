import React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { taskApi } from "../api.js";
import TaskForm from "../components/TaskForm.jsx";

export default function TaskEditor() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(editing);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;
    let active = true;
    taskApi.get(id).then((data) => { if (active) setTask(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, editing]);

  async function saveTask(data) {
    if (editing) await taskApi.update(id, data);
    else await taskApi.create(data);
  }

  return (
    <div className="page narrow-page">
      <Link to="/tasks" className="back-link">← Back to tasks</Link>
      <section className="form-panel">
        <p className="eyebrow">{editing ? "REFINE YOUR PLAN" : "MAKE IT HAPPEN"}</p>
        <h1>{editing ? "Edit task" : "Create a task"}</h1>
        <p className="muted">{editing ? "Update the details and save your changes." : "Capture the next thing you want to accomplish."}</p>
        {loading && <div className="loading-state">Loading task…</div>}
        {error && <div className="alert alert-error" role="alert">{error} <button onClick={() => navigate("/tasks")}>Return to tasks</button></div>}
        {!loading && !error && <TaskForm key={id || "new"} initialTask={task} onSave={saveTask} mode={editing ? "edit" : "create"} />}
      </section>
    </div>
  );
}
