import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api", (req, res) => {
  const backendUrl = `/api${req.url}`;
  const proxyReq = http.request(
    {
      hostname: "api",
      port: 5000,
      path: backendUrl,
      method: req.method,
      headers: { ...req.headers, host: "api:5000" },
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