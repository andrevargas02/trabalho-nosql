import { useState } from "react";
import { useAuth } from "../src/Auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);   // faz POST /api/auth/login
      navigate("/");                  // redirecciona para a loja
    } catch {
      alert("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "5rem auto" }}>
      <h2>Iniciar Sessão</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "A entrar…" : "Entrar"}
        </button>
      </form>

      {/* link para registo */}
      <p style={{ marginTop: 8 }}>
        Ainda não tens conta? <Link to="/register">Criar conta</Link>
      </p>
    </div>
  );
};

export default Login;
