import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function MyBookings() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      api.get("/api/bookings").then((res) => setBookings(res.data));
    }
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="my-bookings">
      <button className="back-link" onClick={() => navigate("/")}>
        ← Voltar
      </button>

      <h1>Minhas Reservas</h1>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>Você ainda não tem nenhuma reserva.</p>
          <Link to="/" style={{ color: "#E92A2D", marginTop: 16, display: "inline-block" }}>
            Explorar cidades
          </Link>
        </div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-info">
              <h3>{booking.event_title || "Evento"}</h3>
              <p>
                {booking.quantity} ingresso(s) | R${" "}
                {booking.total_price.toFixed(2)}
              </p>
              {booking.booking_date && (
                <p>
                  📅 {new Date(booking.booking_date + "T00:00:00").toLocaleDateString("pt-BR")}
                  {booking.booking_time && ` às ${booking.booking_time}`}
                </p>
              )}
              <p style={{ opacity: 0.5, fontSize: 13 }}>
                Reservado em {new Date(booking.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <span className={`booking-status ${booking.status}`}>
              {booking.status === "confirmed"
                ? "Confirmado"
                : booking.status === "pending"
                ? "Pendente"
                : "Cancelado"}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
