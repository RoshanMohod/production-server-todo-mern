const todoModel = require("../models/todoModel");

// 1. CREATE A NEW TODO
const createTodoController = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return next({
        statusCode: 400,
        message: "Please provide both title and description",
      });
    }

    const newTodo = await todoModel.create({
      title,
      description,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

// 2. GET ALL TODOS FOR LOGGED-IN USER
const getTodosController = async (req, res, next) => {
  try {
    const todos = await todoModel
      .find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalTodos: todos.length,
      todos,
    });
  } catch (error) {
    next(error);
  }
};

// 3. UPDATE TODO (Status or Content)
const updateTodoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    const todo = await todoModel.findOne({ _id: id, userId: req.user.userId });
    if (!todo) {
      return next({
        statusCode: 404,
        message: "Todo not found",
      });
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// 4. DELETE TODO
const deleteTodoController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await todoModel.findOne({ _id: id, userId: req.user.userId });
    if (!todo) {
      return next({
        statusCode: 404,
        message: "Todo not found",
      });
    }

    await todoModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodoController,
  getTodosController,
  updateTodoController,
  deleteTodoController,
};