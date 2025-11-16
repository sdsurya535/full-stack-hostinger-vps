const express = require("express");
const cors = require("cors");

// /Users/suryaduttadash/FB/server/index.js

const app = express();

// Basic middleware
app.use(express.json());
app.use(cors());

// Simple routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const allowedOrigins = [
  "http://localhost:5174",
  "http://http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Start server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
  // Force exit if not closed within 10s
  setTimeout(() => process.exit(1), 10000);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

module.exports = app;
