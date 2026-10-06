import React from 'react';
import { Link } from "react-router-dom";

const statusLabel = { PENDING: "Pending", IN_PROGRESS: "In Progress", COMPLETED: "Completed" };

export default function TaskCard({ task, onDelete, onStatusChange }) {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date";
  return (
    <article className={`task-card ${task.status === "COMPLETED" ? "task-completed" : ""}`}>
      <div className="task-card-top">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority} priority</span>
        <span className={`status status-${task.status.toLowerCase()}`}>{statusLabel[task.status]}</span>
      </div>
      <h3>{task.title}</h3>
      <p className="task-description">{task.description || "No description added."}</p>
      <div className="task-meta"><span>◷ {due}</span><span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span></div>
      <div className="task-actions">
        <label className="status-control">
          <span className="sr-only">Change task status</span>
          <select aria-label={`Status for ${task.title}`} value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </label>
        <div className="action-links">
          <Link className="button button-quiet" to={`/tasks/${task.id}/edit`}>Edit</Link>
          <button className="button button-danger-quiet" onClick={() => onDelete(task.id, task.title)}>Delete</button>
        </div>
      </div>
    </article>
  );
}
