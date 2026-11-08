import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark">◎</span> ONTRACK
      </Link>

      <div className="nav-links">
        <a href="/#features">Features</a>
        <a href="/#how">How it works</a>
      </div>

      <div className="nav-actions">
        {token ? (
          <>
            <Link to="/dashboard" className="btn btn-outline">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-primary">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              Log in
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
