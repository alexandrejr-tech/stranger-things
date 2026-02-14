const { Router } = require("express");
const supabase = require("../config/supabase");

const router = Router();

// GET /api/testimonials
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
