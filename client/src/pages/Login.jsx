import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password)
      return setError("Please fill in all fields.");

    setLoading(true);
    try {
      const data = await request("/auth/login", { method: "POST", body: form });
      saveSession(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-brand">
        <Link to="/" className="logo logo-light">
          <span className="logo-mark">◎</span> ONTRACK
        </Link>
        <div>
          <h2>Welcome back!</h2>
          <p>
            Your study plan is waiting. Log in to see what's next on your
            schedule.
          </p>
        </div>
        <small>Smart academic workload management</small>
      </aside>

      <main className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h1>Log in</h1>
          <p className="muted">
            Enter your credentials to access your account.
          </p>

          {error && <div className="error-msg">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@medtech.tn"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="switch-auth">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
