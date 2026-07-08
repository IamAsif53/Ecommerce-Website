import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/settings`;

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const getSettings = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateSettings = async (settings) => {
  const response = await axios.put(API_URL, settings, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
