import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = process.env.API_URL || "/api";

app.get("/env.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`window.API_URL = "${API_URL}";`);
});

app.use("/api", (req, res) => {
  const backendUrl = `/api${req.url}`;
  const apiHost = process.env.API_HOST || "api";
  const proxyReq = http.request(
    {
      hostname: apiHost,
      port: 5000,
      path: backendUrl,
      method: req.method,
      headers: { ...req.headers, host: `${apiHost}:5000` },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  );

  proxyReq.on("error", (error) => {
    res.statusCode = 502;
    res.end(`Proxy request failed: ${error.message}`);
  });

  req.pipe(proxyReq, { end: true });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});