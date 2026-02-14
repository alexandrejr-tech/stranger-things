import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookingModal from "../components/BookingModal";
import api from "../services/api";

export default function CityDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    api.get(`/api/cities/${id}`).then((res) => {
      setCity(res.data.city);
      setEvents(res.data.events);
    });
  }, [id]);

  const handleBook = (event) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedEvent(event);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      await api.post("/api/bookings", bookingData);
      setSelectedEvent(null);
      navigate("/minhas-reservas");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao criar reserva");
    }
  };

  if (!city) {
    return (
      <div className="city-details">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="city-details">
      <button className="back-link" onClick={() => navigate("/")}>
        ← Voltar
      </button>

      <div className="city-hero">
        <img src={city.image_url} alt={city.name} />
      </div>

      <div className="city-info">
        <h1>{city.name}</h1>
        <p className="country">{city.country}</p>
      </div>

      <div className="events-list">
        <h2>Eventos Disponíveis</h2>
        {events.length === 0 ? (
          <p style={{ opacity: 0.5 }}>Nenhum evento disponível no momento.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  {new Date(event.date).toLocaleDateString("pt-BR")} |{" "}
                  {event.capacity} vagas
                </p>
              </div>
              <div className="event-price">
                <div className="price">R$ {event.price.toFixed(2)}</div>
                <button className="btn-book" onClick={() => handleBook(event)}>
                  Reservar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
