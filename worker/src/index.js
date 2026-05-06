import dotenv from "dotenv";
import redis from "./queue.js";
import pool from "./db.js";

dotenv.config();

console.log("Worker started...");

async function processTask(taskData) {
  const { id } = JSON.parse(taskData);

  try {
    // mark as processing
    await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2",
      ["processing", id]
    );

    console.log(`Processing task ${id}...`);

    // simulate work
    await new Promise((res) => setTimeout(res, 3000));

    // mark as completed
    await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2",
      ["completed", id]
    );

    console.log(`Completed task ${id}`);
  } catch (err) {
    console.error("Worker error:", err);
  }
}

async function startWorker() {
  while (true) {
    try {
      const task = await redis.brpop("task_queue", 0);
      const taskData = task[1];

      await processTask(taskData);
    } catch (err) {
      console.error("Queue error:", err);
    }
  }
}

startWorker();