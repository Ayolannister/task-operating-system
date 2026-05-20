import express from "express";
import pool from "../db.js";
import redis from "../queue.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Create task
router.post("/", async (req, res) => {
  const id = uuidv4();
  const { task } = req.body;

  try {
    await pool.query(
      "INSERT INTO tasks(id, task, status) VALUES($1, $2, $3)",
      [id, task, "pending"]
    );

    // push to queue
    await redis.lpush("task_queue", JSON.stringify({ id, task }));

    res.json({ message: "Task created", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tasks
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

export default router;