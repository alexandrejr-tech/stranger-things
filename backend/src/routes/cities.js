const { Router } = require("express");
const supabase = require("../config/supabase");

const router = Router();

// GET /api/cities
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cities")
      .select("*")
      .order("name");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// GET /api/cities/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data: city, error: cityError } = await supabase
      .from("cities")
      .select("*")
      .eq("id", id)
      .single();

    if (cityError || !city) {
      return res.status(404).json({ error: "Cidade não encontrada" });
    }

    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .eq("city_id", id)
      .order("date");

    if (eventsError) throw eventsError;

    res.json({ city, events });
  } catch (error) {
    console.error("Erro ao buscar cidade:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
