import React, { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import TodoModal from "../../components/TodoModal";
import TodoCard from "../../components/TodoCard";
import { getTodos, deleteTodo } from "../../Services/todoService";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  // Filter & Search states
  const [filterStatus, setFilterStatus] = useState("all"); // 'all' | 'pending' | 'completed'
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all user tasks from backend
  const fetchAllTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      if (res?.success) {
        setTodos(res.todos || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllTodos();
  }, [fetchAllTodos]);

  // Open modal in Create mode
  const handleOpenCreateModal = () => {
    setTodoToEdit(null);
    setIsModalOpen(true);
  };

  // Open modal in Edit mode
  const handleOpenEditModal = (todo) => {
    setTodoToEdit(todo);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTodoToEdit(null);
  };

  // Delete task handler
  const handleDeleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await deleteTodo(id);
      if (res?.success) {
        toast.success(res.message || "Task deleted successfully!");
        setTodos((prevTodos) => prevTodos.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  // Filter and search logic
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Status filter
      if (filterStatus === "pending" && todo.isCompleted) return false;
      if (filterStatus === "completed" && !todo.isCompleted) return false;

      // Search filter (matches title or description)
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesTitle = todo.title?.toLowerCase().includes(query);
        const matchesDesc = todo.description?.toLowerCase().includes(query);
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [todos, filterStatus, searchTerm]);

  // Task count tallies
  const pendingCount = todos.filter((t) => !t.isCompleted).length;
  const completedCount = todos.filter((t) => t.isCompleted).length;

  return (
    <div style={{ maxWidth: "1100px", margin: "2rem auto", padding: "0 1.5rem" }}>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#111827", fontSize: "1.75rem" }}>
            My Tasks
          </h2>
          <p style={{ margin: "0.25rem 0 0", color: "#6b7280", fontSize: "0.95rem" }}>
            Manage, organize, and track your daily tasks
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            padding: "0.6rem 1.3rem",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
          }}
        >
          + Add New Task
        </button>
      </div>

      {/* Control Bar: Filter Tabs & Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          backgroundColor: "#ffffff",
          padding: "1rem 1.25rem",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          marginBottom: "1.75rem",
        }}
      >
        {/* Status Filter Tabs */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setFilterStatus("all")}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: filterStatus === "all" ? "#2563eb" : "#d1d5db",
              backgroundColor: filterStatus === "all" ? "#2563eb" : "#f9fafb",
              color: filterStatus === "all" ? "#ffffff" : "#374151",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            All ({todos.length})
          </button>

          <button
            onClick={() => setFilterStatus("pending")}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: filterStatus === "pending" ? "#f59e0b" : "#d1d5db",
              backgroundColor: filterStatus === "pending" ? "#f59e0b" : "#f9fafb",
              color: filterStatus === "pending" ? "#ffffff" : "#374151",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Pending ({pendingCount})
          </button>

          <button
            onClick={() => setFilterStatus("completed")}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: filterStatus === "completed" ? "#10b981" : "#d1d5db",
              backgroundColor: filterStatus === "completed" ? "#10b981" : "#f9fafb",
              color: filterStatus === "completed" ? "#ffffff" : "#374151",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Search Input */}
        <div style={{ minWidth: "240px", flex: "1", maxWidth: "320px" }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.85rem",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "0.9rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          Loading your tasks...
        </div>
      ) : filteredTodos.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3.5rem 2rem",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px dashed #d1d5db",
          }}
        >
          <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>
            {todos.length === 0
              ? "No tasks found"
              : "No tasks match your current filter"}
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "1.2rem" }}>
            {todos.length === 0
              ? "Get started by creating your first task!"
              : "Try switching filter tabs or clearing your search query."}
          </p>
          {todos.length === 0 && (
            <button
              onClick={handleOpenCreateModal}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                padding: "0.55rem 1.2rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Create Task
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}

      {/* Modal for Create/Update */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTodoCreated={fetchAllTodos}
        todoToEdit={todoToEdit}
      />
    </div>
  );
};

export default TodoList;