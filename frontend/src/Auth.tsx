import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
} from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    () => localStorage.getItem("user") || null
  );
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token") || null
  );

  /* ---------- LOGIN ---------- */
  const login = async (email: string, password: string) => {
    const res = await axios.post("/api/auth/login", { email, password });
    // res.data → { token, email, name }
    localStorage.setItem("user", res.data.email);
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
    setUser(res.data.email);
    setToken(res.data.token);
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;
    setUser(null);
    setToken(null);
  };

  /* ---------- mantém token nos refresh ---------- */
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

/* ---------- proteger rotas ---------- */
export const RequireAuth = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
