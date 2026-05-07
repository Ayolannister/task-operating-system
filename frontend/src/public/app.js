const API_URL = "http://localhost:5000/api";

async function createTask() {
  const task = document.getElementById("taskInput").value;

  await fetch(`${API_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task })
  });

  loadTasks();
}

async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.task} - ${t.status}`;
    list.appendChild(li);
  });
}

// auto refresh every 3 seconds
setInterval(loadTasks, 3000);

loadTasks();