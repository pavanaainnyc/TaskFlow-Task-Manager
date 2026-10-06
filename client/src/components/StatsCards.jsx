import React from 'react';
export default function StatsCards({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "COMPLETED").length;
  const inProgress = tasks.filter((task) => task.status === "IN_PROGRESS").length;
  const highPriority = tasks.filter((task) => task.priority === "HIGH" && task.status !== "COMPLETED").length;
  const stats = [
    { label: "Total tasks", value: total, symbol: "▤", tone: "violet" },
    { label: "In progress", value: inProgress, symbol: "◷", tone: "blue" },
    { label: "Completed", value: completed, symbol: "✓", tone: "green" },
    { label: "High priority open", value: highPriority, symbol: "!", tone: "orange" }
  ];
  return (
    <section className="stats-grid" aria-label="Task statistics">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <span className={`stat-icon ${stat.tone}`}>{stat.symbol}</span>
          <div><p>{stat.label}</p><strong>{stat.value}</strong></div>
        </article>
      ))}
    </section>
  );
}
