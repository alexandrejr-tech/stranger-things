import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "Ocorreu um erro. Tente novamente."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>STRANGER THINGS</h2>
        <p className="subtitle">
          {isRegister ? "Crie sua conta" : "Entre na sua conta"}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn-primary">
            {isRegister ? "Criar Conta" : "Entrar"}
          </button>
        </form>

        <p className="toggle-text">
          {isRegister ? "Já tem uma conta? " : "Não tem uma conta? "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Entrar" : "Criar conta"}
          </span>
        </p>
      </div>
    </div>
  );
}
