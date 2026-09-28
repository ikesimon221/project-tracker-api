import { useState } from "react";
import { login } from "./api";

function Login({ onSwitch, onLogin }) {
  // State: values React remembers and re-renders the screen when they change
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    setError("");

        try {
      const data = await login(email, password);
      // Hand the token to App, which saves it and switches to the dashboard
      onLogin(data.access_token);
    } catch (err) {
      setError(err.message); // show "Incorrect email or password"
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
      {error && <p>{error}</p>}
        <button type="button" onClick={onSwitch}>
    Need an account? Register
  </button>
    </form>
  );
}

export default Login;