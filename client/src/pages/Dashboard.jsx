import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { request } from "../api.js";

const stats = [
  { label: "Courses", value: 0, icon: "📚" },
  { label: "Pending tasks", value: 0, icon: "📝" },
  { label: "Study hours this week", value: "0h", icon: "⏱️" },
  { label: "Upcoming deadlines", value: 0, icon: "⏰" },
];

const roadmap = [
  {
    week: "Week 1",
    item: "Project setup, landing page, authentication",
    done: true,
  },
  { week: "Week 2", item: "Course & task management (CRUD)", done: false },
  { week: "Week 3", item: "Workload prediction", done: false },
  { week: "Week 4", item: "Smart scheduling algorithm", done: false },
  { week: "Week 5", item: "Analytics dashboard", done: false },
  { week: "Week 6", item: "AI study assistant", done: false },
];

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    request("/auth/me", { token }).catch(() => {
      logout();
      navigate("/login");
    });
  }, [token]);

  return (
    <>
      <Navbar />
      <main className="dashboard">
        <div className="dash-header">
          <div>
            <h1>Hello, {user?.name?.split(" ")[0]} 👋</h1>
            <p className="muted">
              Here's an overview of your academic workload.
            </p>
          </div>
          <button className="btn btn-primary" disabled title="Coming in Week 2">
            + Add course
          </button>
        </div>

        <div className="stat-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-icon">{s.icon}</span>
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>Development roadmap</h2>
          <ul className="roadmap">
            {roadmap.map((r) => (
              <li key={r.week} className={r.done ? "done" : ""}>
                <span className="check">{r.done ? "✔" : "○"}</span>
                <b>{r.week}</b> — {r.item}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
