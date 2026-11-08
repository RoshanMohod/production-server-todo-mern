import axios from "axios";

// Explicit backend URL pointing to port 8080
const BASE_URL = "http://localhost:8080/api/v1/todo";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 1. Create a new todo
export const createTodo = async (todoData) => {
  const response = await axios.post(
    `${BASE_URL}/create-todo`,
    todoData,
    getAuthHeaders()
  );
  return response.data;
};

// 2. Fetch all user todos
export const getTodos = async () => {
  const response = await axios.get(
    `${BASE_URL}/get-todos`,
    getAuthHeaders()
  );
  return response.data;
};

// 3. Update todo
export const updateTodo = async (id, updatedData) => {
  const response = await axios.put(
    `${BASE_URL}/update-todo/${id}`,
    updatedData,
    getAuthHeaders()
  );
  return response.data;
};

// 4. Delete todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/delete-todo/${id}`,
    getAuthHeaders()
  );
  return response.data;
};