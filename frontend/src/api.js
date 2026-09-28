// The one place that knows where our backend lives
const API_URL = "http://127.0.0.1:8000";

// Send a POST request with a JSON body and return the JSON reply
async function postJson(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  // fetch does NOT throw on 400 or 401, so we check the status ourselves
  if (!response.ok) {
    // Our own errors send a text message; validation errors (422) send a list
    const message =
      typeof data.detail === "string" ? data.detail : "Please check your input";
    throw new Error(message);
  }

  return data;
}

export function register(email, password) {
  return postJson("/auth/register", { email, password });
}

export function login(email, password) {
  return postJson("/auth/login", { email, password });
}