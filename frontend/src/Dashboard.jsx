function Dashboard({ onLogout }) {
  return (
    <div>
      <h2>Your projects</h2>
      <p>You are logged in.</p>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}

export default Dashboard;