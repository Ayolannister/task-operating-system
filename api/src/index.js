import express from "express";
import dotenv from "dotenv";
import client from "prom-client";
import taskRoutes from "./routes/tasks.js";
import cors from "cors";

dotenv.config();
client.collectDefaultMetrics();

const register = client.register;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", taskRoutes);

app.get("/health", (req, res) => {
  res.send("OK");
});
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
;

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});