import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/chat`;

export const sendMessage = async (message) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const clearChat = async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return axios.delete(`${API_URL}/clear`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
