import React from 'react';
import TaskCard from "./TaskCard.jsx";

export default function TaskList({ tasks, onDelete, onStatusChange }) {
  if (!tasks.length) {
    return <div className="empty-state"><span>✓</span><h3>No tasks found</h3><p>Try changing your filters or create a new task.</p></div>;
  }
  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
