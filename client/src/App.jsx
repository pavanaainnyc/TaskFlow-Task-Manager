import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import TaskEditor from "./pages/TaskEditor.jsx";
import "./styles.css";

function NotFound() {
  return <main className="page empty-page"><h1>Page not found</h1><p className="muted">The page you are looking for does not exist.</p><a className="button button-primary" href="/">Back to dashboard</a></main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/new" element={<TaskEditor />} />
          <Route path="/tasks/:id/edit" element={<TaskEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="footer">TaskFlow · Plan clearly. Finish confidently.</footer>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
