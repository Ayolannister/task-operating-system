import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", taskRoutes);

app.get("/health", (req, res) => {
  res.send("OK");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});