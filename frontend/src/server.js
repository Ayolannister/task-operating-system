import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});


app.listen(5000, "0.0.0.0", () => {
  console.log("API running on port 5000");
});