import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProjectDetail from "./ProjectDetail";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token"));
  // Which project is open, or null if we're on the dashboard
  const [openProject, setOpenProject] = useState(null);

  function handleLogin(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setOpenProject(null);
  }

  if (token) {
    if (openProject) {
      return (
        <ProjectDetail
          token={token}
          project={openProject}
          onBack={() => setOpenProject(null)}
          onLogout={handleLogout}
        />
      );
    }
    return (
      <Dashboard
        token={token}
        onLogout={handleLogout}
        onOpenProject={setOpenProject}
      />
    );
  }

  if (page === "register") {
    return <Register onSwitch={() => setPage("login")} onLogin={handleLogin} />;
  }
  return <Login onSwitch={() => setPage("register")} onLogin={handleLogin} />;
}

export default App;