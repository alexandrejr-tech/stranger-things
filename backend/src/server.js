require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const citiesRoutes = require("./routes/cities");
const testimonialsRoutes = require("./routes/testimonials");
const bookingsRoutes = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/bookings", bookingsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Stranger Things API rodando!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
