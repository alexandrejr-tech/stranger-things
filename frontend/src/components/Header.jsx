import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <Link to="/">
        <h2>GC.</h2>
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/minhas-reservas">Minhas Reservas</Link>
            <button className="btn-login" onClick={logout}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn-login">Entrar</button>
          </Link>
        )}
        <img src="/imagens/netflix-logo.svg" alt="Netflix" />
      </nav>
    </header>
  );
}
