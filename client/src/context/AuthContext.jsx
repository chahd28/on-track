import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("ontrack_token"),
  );
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ontrack_user");
    return saved ? JSON.parse(saved) : null;
  });

  const saveSession = ({ token, user }) => {
    localStorage.setItem("ontrack_token", token);
    localStorage.setItem("ontrack_user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("ontrack_token");
    localStorage.removeItem("ontrack_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, saveSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
