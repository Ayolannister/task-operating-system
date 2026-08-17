// import express from "express";
// import dotenv from "dotenv";
// import client from "prom-client";
// import taskRoutes from "./routes/tasks.js";
// import cors from "cors";

// dotenv.config();
// client.collectDefaultMetrics();

// const register = client.register;

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api", taskRoutes);

// app.get("/health", (req, res) => {
//   res.send("OK");
// });
// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", register.contentType);
//   res.end(await register.metrics());
// });
// ;

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`API running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import client from "prom-client";
import taskRoutes from "./routes/tasks.js";
import cors from "cors";

dotenv.config();

client.collectDefaultMetrics();

const register = client.register;

const httpRequestsTotal = new client.Counter({
  name: "api_http_requests_total",
  help: "Total number of HTTP requests received",
  labelNames: ["method", "route", "status_code"],
});

const httpRequestDuration = new client.Histogram({
  name: "api_http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

const httpRequestsInFlight = new client.Gauge({
  name: "api_http_requests_in_flight",
  help: "Number of HTTP requests currently being processed",
  labelNames: ["method"],
});

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  if (req.path === "/metrics") {
    return next();
  }

  const start = process.hrtime();

  httpRequestsInFlight
    .labels(req.method)
    .inc();

  res.on("finish", () => {
    const duration = process.hrtime(start);

    const durationSeconds =
      duration[0] + duration[1] / 1e9;

    const route = req.route?.path || "unknown";
    const statusCode = String(res.statusCode);

    httpRequestsTotal
      .labels(req.method, route, statusCode)
      .inc();

    httpRequestDuration
      .labels(req.method, route, statusCode)
      .observe(durationSeconds);

    httpRequestsInFlight
      .labels(req.method)
      .dec();
  });

  next();
});

app.use("/api", taskRoutes);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});