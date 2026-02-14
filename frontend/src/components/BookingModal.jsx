import { useState } from "react";

export default function BookingModal({ event, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const total = (event.price * quantity).toFixed(2);

  const today = new Date().toISOString().split("T")[0];

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const availableTimes = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

  const filteredTimes = availableTimes.filter((time) => {
    if (selectedDate === today) {
      return time > currentTime;
    }
    return true;
  });

  const isValid = selectedDate && selectedTime && quantity > 0;

  const handleConfirm = () => {
    if (!isValid) return;
    onConfirm({
      event_id: event.id,
      quantity,
      total_price: parseFloat(total),
      booking_date: selectedDate,
      booking_time: selectedTime,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Reservar Ingressos</h2>
        <p style={{ marginBottom: 8, opacity: 0.7 }}>{event.title}</p>
        <p style={{ marginBottom: 24, opacity: 0.5, fontSize: 14 }}>
          R$ {event.price.toFixed(2)} por ingresso
        </p>

        <div className="booking-field">
          <label>Data da visita</label>
          <input
            type="date"
            value={selectedDate}
            min={today}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedTime("");
            }}
          />
        </div>

        {selectedDate && (
          <div className="booking-field">
            <label>Horário</label>
            <div className="time-slots">
              {filteredTimes.length === 0 ? (
                <p style={{ opacity: 0.5, fontSize: 14 }}>
                  Nenhum horário disponível para hoje
                </p>
              ) : (
                filteredTimes.map((time) => (
                  <button
                    key={time}
                    className={`time-slot ${selectedTime === time ? "active" : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(Math.min(10, quantity + 1))}>
            +
          </button>
          <span style={{ fontSize: 14, opacity: 0.6 }}>ingressos</span>
        </div>

        <div className="total">
          Total: <span className="price">R$ {total}</span>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-confirm"
            onClick={handleConfirm}
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.4, cursor: isValid ? "pointer" : "not-allowed" }}
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
}
