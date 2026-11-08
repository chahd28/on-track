import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password)
      return setError("Please fill in all required fields.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");

    setLoading(true);
    try {
      const { confirm, ...payload } = form;
      const data = await request("/auth/register", {
        method: "POST",
        body: payload,
      });
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
          <h2>Join ONTRACK</h2>
          <p>
            Organize your courses, beat your deadlines and study smarter — not
            harder.
          </p>
        </div>
        <small>Smart academic workload management</small>
      </aside>

      <main className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h1>Create account</h1>
          <p className="muted">It only takes a minute.</p>

          {error && <div className="error-msg">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Full name *</label>
            <input
              id="name"
              name="name"
              placeholder="Chahd Saoudi"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@medtech.tn"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="university">University</label>
            <input
              id="university"
              name="university"
              placeholder="MedTech"
              value={form.university}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm *</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="switch-auth">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
