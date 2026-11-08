import axios from "axios";

// Automatically attach JWT token to all protected requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (data) => {
  return axios.post("/user/register", data);
};

export const loginUser = (data) => {
  return axios.post("/user/login", data);
};

const AuthServices = { registerUser, loginUser };
export default AuthServices;