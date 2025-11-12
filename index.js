import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// In-memory todo list
let todos = [
  { id: 1, task: "Learn Express", isDone: false },
  { id: 2, task: "Build a Todo App", isDone: false },
];

// 📥 Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ➕ Add new todo
app.post("/add-todo", (req, res) => {
  const newTask = req.body.task;
  if (newTask && newTask.trim() !== "") {
    const todo = {
      id: Date.now(),
      task: newTask.trim(),
      isDone: false,
    };
    todos.push(todo);
  }
  res.redirect("/");
});

// 🗑️ Delete a todo by ID
app.delete("/delete-todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ success: true });
});

// ✏️ Update (mark done or edit) a todo
app.put("/update-todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, isDone } = req.body;
  todos = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          task: task !== undefined ? task : todo.task,
          isDone: isDone !== undefined ? isDone : todo.isDone,
        }
      : todo
  );
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
