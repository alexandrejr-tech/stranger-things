const { Router } = require("express");
const supabase = require("../config/supabase");
const authMiddleware = require("../middleware/auth");

const router = Router();

// POST /api/bookings (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { event_id, quantity, total_price, booking_date, booking_time } = req.body;
    const user_id = req.userId;

    if (!event_id || !quantity || !booking_date || !booking_time) {
      return res.status(400).json({ error: "event_id, quantity, booking_date e booking_time são obrigatórios" });
    }

    const bookingDateTime = new Date(`${booking_date}T${booking_time}:00`);
    if (bookingDateTime <= new Date()) {
      return res.status(400).json({ error: "Não é possível reservar para datas ou horários passados" });
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        user_id,
        event_id,
        quantity,
        total_price,
        booking_date,
        booking_time,
        status: "confirmed",
      })
      .select("*")
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// GET /api/bookings (auth required)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user_id = req.userId;

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        events (title, date)
      `)
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const bookings = data.map((b) => ({
      ...b,
      event_title: b.events?.title,
      event_date: b.events?.date,
    }));

    res.json(bookings);
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
