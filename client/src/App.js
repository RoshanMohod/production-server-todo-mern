import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";
import TodoList from "./pages/Todos/TodoList";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      {/* Top Navbar */}
      <Navbar />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todoList" element={<TodoList />} />
      </Routes>

      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;