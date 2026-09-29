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

  if (!response.ok) {
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

// Sends a request with the login token attached. Works for GET, POST, etc.
async function authRequest(path, token, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return data;
}

export function getProjects(token) {
  return authRequest("/projects/", token);
}

export function createProject(token, project) {
  return authRequest("/projects/", token, {
    method: "POST",
    body: JSON.stringify(project),
  });
}
export function getTasks(token, projectId) {
  return authRequest(`/projects/${projectId}/tasks/`, token);
}

export function createTask(token, projectId, task) {
  return authRequest(`/projects/${projectId}/tasks/`, token, {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function updateTask(token, projectId, taskId, updates) {
  return authRequest(`/projects/${projectId}/tasks/${taskId}`, token, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}