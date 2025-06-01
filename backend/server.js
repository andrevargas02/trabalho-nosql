const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir imagens da pasta 'fotos' localmente
app.use("/fotos", express.static("fotos"));

// Routes
const clothingRoutes = require("./routes/clothingRoutes");
app.use("/api/clothing", clothingRoutes);

// Root route (health-check)
app.get("/", (req, res) => res.send("API Loja de Roupa online!"));

// DB Connection + Server start
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () =>
      console.log(`Server listening on http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
