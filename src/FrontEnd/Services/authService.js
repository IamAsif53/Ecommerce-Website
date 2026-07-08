import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

export const updateProfile = async (userData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.put(`${API_URL}/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changePassword = async (passwordData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.put(`${API_URL}/change-password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
