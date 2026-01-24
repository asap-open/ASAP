import express from "express";
import authRoutes from "./routes/auth.route.js";
import sessionRoutes from "./routes/session.route.js";
import exerciseRoutes from "./routes/exercise.route.js";
import weightRoutes from "./routes/weight.route.js";
import profileRoutes from "./routes/profile.route.js";

const app = express();
const port = process.env.PORT || 3000;
const frontendDomain = process.env.FRONTEND_DOMAIN;

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(
    `[${new Date().toISOString()}] Incoming: ${req.method} ${req.originalUrl}`,
  );

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] Resolved: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
});

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendDomain);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/weights", weightRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("ASAP API Server Running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
