import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask } from "./api";

function ProjectDetail({ token, project, onBack, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getTasks(token, project.id);
        setTasks(data);
      } catch (err) {
        if (err.message === "UNAUTHORIZED") {
          onLogout();
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, project.id, onLogout]);

  async function handleCreate(event) {
    event.preventDefault();
    setError("");

    try {
      const created = await createTask(token, project.id, { title });
      setTasks([...tasks, created]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Flip a task's done state, and update it in the database and on screen
  async function toggleDone(task) {
    try {
      const updated = await updateTask(token, project.id, task.id, {
        is_done: !task.is_done,
      });
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

   return (
    <div className="page">
      <div className="card wide">
        <div className="top-row">
          <h2>{project.name}</h2>
          <button onClick={onBack}>Back to projects</button>
        </div>

        <form onSubmit={handleCreate}>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Add task</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && tasks.length === 0 && <p>No tasks yet.</p>}

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.is_done}
                onChange={() => toggleDone(task)}
              />
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetail;