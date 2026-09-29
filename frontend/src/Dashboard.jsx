import { useState, useEffect } from "react";
import { getProjects, createProject } from "./api";

function Dashboard({ token, onLogout, onOpenProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProjects(token);
        setProjects(data);
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
  }, [token, onLogout]);

  async function handleCreate(event) {
    event.preventDefault();
    setError("");

    try {
      const created = await createProject(token, {
        name,
        client: client || null,
      });
      setProjects([...projects, created]);
      setName("");
      setClient("");
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        onLogout();
      } else {
        setError(err.message);
      }
    }
  }

  return (
    <div>
      <h2>Your projects</h2>
      <button onClick={onLogout}>Log out</button>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Client (optional)"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <button type="submit">Add project</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => onOpenProject(project)} style={{ cursor: "pointer" }}>
  {project.name} ({project.status})
  {project.client && ` - ${project.client}`}
</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;