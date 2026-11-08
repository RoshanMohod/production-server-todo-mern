import React from "react";
import "./TodoCard.css";

const TodoCard = ({ todo, onEdit, onDelete }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={`todo-card ${todo.isCompleted ? "completed" : ""}`}>
      <div className="todo-card-header">
        <h4 className="todo-card-title">{todo.title}</h4>
        <span
          className={`status-badge ${
            todo.isCompleted ? "badge-completed" : "badge-pending"
          }`}
        >
          {todo.isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="todo-card-description">{todo.description}</p>

      <div className="todo-card-footer">
        <span className="todo-date">📅 {formattedDate}</span>
        <div className="todo-card-actions">
          <button
            className="card-btn btn-edit"
            title="Edit Task"
            onClick={() => onEdit(todo)}
          >
            ✏️
          </button>
          <button
            className="card-btn btn-delete"
            title="Delete Task"
            onClick={() => onDelete(todo._id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;