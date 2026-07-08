import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

export const getDashboardData = async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
