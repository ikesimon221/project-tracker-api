import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("login");
  // Start from any token saved earlier, so a page refresh keeps you logged in
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // If we have a token, show the dashboard instead of the forms
  if (token) {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (page === "register") {
    return <Register onSwitch={() => setPage("login")} onLogin={handleLogin} />;
  }
  return <Login onSwitch={() => setPage("register")} onLogin={handleLogin} />;
}

export default App;