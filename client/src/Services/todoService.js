import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/todo"
    : "http://localhost:8080/api/v1/todo";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createTodo = async (todoData) => {
  const response = await axios.post(`${BASE_URL}/create-todo`, todoData, getAuthHeaders());
  return response.data;
};

export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/get-todos`, getAuthHeaders());
  return response.data;
};

export const updateTodo = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/update-todo/${id}`, updatedData, getAuthHeaders());
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/delete-todo/${id}`, getAuthHeaders());
  return response.data;
};