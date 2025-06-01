import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
    alert("Registo concluído! Faça login.");
    navigate("/login");
  };

  return (
    <div style={{ width: 300, margin: "5rem auto" }}>
      <h2>Registar</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ width: "100%", marginTop: 8 }}>
          Criar conta
        </button>
      </form>
      <p style={{ marginTop: 8 }}>
        Já tens conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
};

export default Register;
