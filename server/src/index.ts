import express from "express";
import authRoutes from "./routes/auth.route.js";
import sessionRoutes from "./routes/session.route.js";
import exerciseRoutes from "./routes/exercise.route.js";
import weightRoutes from "./routes/weight.route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/weights", weightRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
