const express = require("express");
const Todo = require("../models/Todo");
require("dotenv").config();
const router = express.Router();

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new Todo
router.post("/", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const todo = await Todo({
    title: req.body.title,
    completed: req.body.completed || false,
    description: req.body.description,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific todo by Id
router.get("/:id", getTodo, async (req, res) => {
  res.json(res.todo);
});

// Update a todo
router.put("/:id", getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }

  if (req.body.completed != null) {
    res.todo.completed = req.body.completed;
  }

  if(req.body.description != null){
    res.todo.description = req.body.description;
  }

  try {
    const updateTodo = await res.todo.save();

    res.json(updateTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:id", getTodo, async (req, res) => {
  console.log(`Deleting todo with ID: ${req.params.id}`);
  try {
    await res.todo.deleteOne();
    res.json({ message: "Deleted Todo" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
});


async function getTodo(req, res, next) {
  let todo;

  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); 
  }
  res.todo = todo;
  next();
}

module.exports = router;
