import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createTodo, updateTodo } from "../Services/todoService";
import "./TodoModal.css";

const TodoModal = ({ isOpen, onClose, onTodoCreated, todoToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-fill form values if editing an existing task
  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title || "");
      setDescription(todoToEdit.description || "");
      setIsCompleted(todoToEdit.isCompleted || false);
    } else {
      setTitle("");
      setDescription("");
      setIsCompleted(false);
    }
  }, [todoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return toast.error("Please provide both title and description");
    }

    try {
      setLoading(true);

      if (todoToEdit) {
        // Update existing task
        const res = await updateTodo(todoToEdit._id, {
          title,
          description,
          isCompleted,
        });

        if (res?.success) {
          toast.success(res.message || "Task updated successfully!");
          onTodoCreated();
          onClose();
        }
      } else {
        // Create new task
        const res = await createTodo({ title, description });

        if (res?.success) {
          toast.success(res.message || "Task created successfully!");
          setTitle("");
          setDescription("");
          onTodoCreated();
          onClose();
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{todoToEdit ? "Update Task" : "Create New Task"}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="todo-title">Task Title</label>
            <input
              id="todo-title"
              type="text"
              placeholder="e.g., Study Data Structures"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="todo-desc">Description</label>
            <textarea
              id="todo-desc"
              rows="4"
              placeholder="Add details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Show completion status toggle when editing */}
          {todoToEdit && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                id="isCompleted"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <label
                htmlFor="isCompleted"
                style={{ cursor: "pointer", fontSize: "0.9rem", color: "#374151" }}
              >
                Mark as Completed
              </label>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : todoToEdit
                ? "Update Task"
                : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;