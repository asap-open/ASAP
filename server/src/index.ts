import express from "express";
import authRoutes from "./routes/auth.route";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
