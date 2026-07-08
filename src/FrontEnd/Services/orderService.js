import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/orders`;

export const createOrder = async (orderData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOrders = async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getUserOrders = async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.get(`${API_URL}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const PAYMENT_API = `${import.meta.env.VITE_API_URL}/api/payment`;

export const initiatePayment = async (paymentData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.post(`${PAYMENT_API}/initiate`, paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//--------------------------------------------------
// Get Single Order
//--------------------------------------------------

export const getOrderById = async (id) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
