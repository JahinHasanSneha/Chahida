import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./src/routes/authRoutes.js";

import postRoutes from "./src/routes/postRoutes.js";

import lostFoundRoutes from "./src/routes/lostFoundRoutes.js";



dotenv.config();

const app = express();

// Allow larger JSON bodies to accept base64 image payloads from the frontend
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/posts", postRoutes);
app.use("/api/lost-found", lostFoundRoutes);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Chahida Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Chahida backend" });
});

app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
