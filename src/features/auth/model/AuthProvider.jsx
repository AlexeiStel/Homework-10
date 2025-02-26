import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);
  const navigate = useNavigate();

  const login = (newUser) => {
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
