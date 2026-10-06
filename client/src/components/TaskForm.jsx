import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initial = { title: "", description: "", status: "PENDING", priority: "MEDIUM", dueDate: "" };

export default function TaskForm({ initialTask, onSave, mode = "create" }) {
  const [form, setForm] = useState(() => initialTask ? {
    title: initialTask.title || "",
    description: initialTask.description || "",
    status: initialTask.status || "PENDING",
    priority: initialTask.priority || "MEDIUM",
    dueDate: initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().slice(0, 10) : ""
  } : initial);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) return setError("Please enter a task title.");
    setError("");
    setSaving(true);
    try {
      await onSave({ ...form, title: form.title.trim(), dueDate: form.dueDate || null });
      navigate("/tasks");
    } catch (err) {
      setError(err.message || "Could not save the task.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error" role="alert">{error}</div>}
      <div className="form-field">
        <label htmlFor="title">Task title <span className="required">*</span></label>
        <input id="title" name="title" value={form.title} onChange={handleChange} maxLength="120" placeholder="e.g. Complete React assignment" required />
      </div>
      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} maxLength="1000" rows="4" placeholder="Add a few details about this task..." />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="PENDING">Pending</option><option value="IN_PROGRESS">In Progress</option><option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" className="button button-primary" disabled={saving}>{saving ? "Saving..." : mode === "edit" ? "Save changes" : "Create task"}</button>
      </div>
    </form>
  );
}
