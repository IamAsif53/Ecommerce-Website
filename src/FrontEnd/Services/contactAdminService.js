import axios from "axios";

const API_URL = "http://localhost:5000/api/contact";

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

// ======================================
// Get All Contact Messages
// ======================================

export const getAllMessages = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ======================================
// Mark Message As Read
// ======================================

export const markMessageAsRead = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};

// ======================================
// Delete Message
// ======================================

export const deleteMessage = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
