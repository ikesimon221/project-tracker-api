import { useState } from "react";
import { register } from "./api";

function Register({ onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      // Our backend logs the user in right after registering, so we get a token back
      const data = await register(email, password);
            onLogin(data.access_token);
    } catch (err) {
      setError(err.message); // e.g. "Email already registered"
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create account</h2>
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
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
      <button type="button" onClick={onSwitch}>
        Already have an account? Log in
      </button>
    </form>
  );
}

export default Register;