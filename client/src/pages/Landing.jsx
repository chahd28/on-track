import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const features = [
  {
    icon: "📚",
    title: "Task & Course Management",
    text: "Create courses, assignments and exams with difficulty, priority, estimated workload and due dates — all in one place.",
  },
  {
    icon: "📈",
    title: "Intelligent Workload Prediction",
    text: "Spot overload periods and deadline conflicts before they happen, based on your tasks and available hours.",
  },
  {
    icon: "🗓️",
    title: "Adaptive Smart Scheduling",
    text: "Get a personalized study plan that adapts automatically when you miss a session, finish early or get new work.",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    text: "Interactive dashboards showing study hours, productivity trends and workload distribution.",
  },
  {
    icon: "🤖",
    title: "AI Study Assistant",
    text: "An LLM-powered assistant that explains concepts, generates practice exercises and keeps you motivated.",
  },
];

const steps = [
  {
    n: "1",
    title: "Add your courses",
    text: "Enter your courses, assignments and exam dates.",
  },
  {
    n: "2",
    title: "Set your availability",
    text: "Tell ONTRACK when you can study each week.",
  },
  {
    n: "3",
    title: "Follow your plan",
    text: "Get a balanced schedule that adapts as you go.",
  },
];

export default function Landing() {
  return (
    <>
      <Navbar />

      <header className="hero">
        <div className="hero-text">
          <span className="badge">Smart academic workload manager</span>
          <h1>
            Stop cramming.
            <br />
            <span className="accent">Stay on track.</span>
          </h1>
          <p>
            ONTRACK organizes your courses, deadlines and exams, predicts your
            workload, and builds a study schedule that adapts to your real life.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Create free account
            </Link>
            <a href="#features" className="btn btn-outline btn-lg">
              See features
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="preview-card">
            <div className="preview-header">
              <strong>This week</strong>
              <span className="pill pill-warn">Workload: High</span>
            </div>
            <ul className="session-list">
              <li>
                <span className="dot dot-blue" />
                <div>
                  <b>Algorithms</b>
                  <small>Mon · 14:00–16:00 · Exam prep</small>
                </div>
              </li>
              <li>
                <span className="dot dot-green" />
                <div>
                  <b>Databases</b>
                  <small>Tue · 10:00–11:30 · Project</small>
                </div>
              </li>
              <li>
                <span className="dot dot-orange" />
                <div>
                  <b>Software Eng.</b>
                  <small>Wed · 17:00–19:00 · Report</small>
                </div>
              </li>
              <li>
                <span className="dot dot-purple" />
                <div>
                  <b>Statistics</b>
                  <small>Thu · 09:00–10:00 · Revision</small>
                </div>
              </li>
            </ul>
            <div className="progress-row">
              <span>Weekly progress</span>
              <span>62%</span>
            </div>
            <div className="progress-bar">
              <div style={{ width: "62%" }} />
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="section">
        <h2 className="section-title">
          Everything you need to manage your semester
        </h2>
        <p className="section-sub">
          Five core features designed around how students actually study.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="section section-alt">
        <h2 className="section-title">How it works</h2>
        <div className="steps">
          {steps.map((s) => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to take control of your semester?</h2>
        <Link to="/register" className="btn btn-light btn-lg">
          Get started now
        </Link>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} ONTRACK · CS324 Project · SE G3 — Eya
        Ayadi, Eya Ben Mouaddeb, Chahd Saoudi
      </footer>
    </>
  );
}
