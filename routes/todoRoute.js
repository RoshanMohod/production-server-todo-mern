const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const {
  createTodoController,
  getTodosController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todoController");

const router = express.Router();

// All routes are protected by userAuth middleware
router.post("/create-todo", userAuth, createTodoController);
router.get("/get-todos", userAuth, getTodosController);
router.put("/update-todo/:id", userAuth, updateTodoController);
router.delete("/delete-todo/:id", userAuth, deleteTodoController);

module.exports = router;