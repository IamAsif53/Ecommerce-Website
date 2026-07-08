import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

const getAuthConfig = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get Cart
export const getCart = async () => {
  const response = await axios.get(API_URL, getAuthConfig());

  return response.data;
};

// Add To Cart
export const addToCart = async (productId) => {
  const response = await axios.post(API_URL, { productId }, getAuthConfig());

  return response.data;
};
export const increaseQuantity = async (productId) => {
  const response = await axios.put(
    `${API_URL}/increase/${productId}`,
    {},
    getAuthConfig(),
  );

  return response.data;
};

export const decreaseQuantity = async (productId) => {
  const response = await axios.put(
    `${API_URL}/decrease/${productId}`,
    {},
    getAuthConfig(),
  );

  return response.data;
};

// Remove From Cart
export const removeFromCart = async (productId) => {
  const response = await axios.delete(
    `${API_URL}/${productId}`,
    getAuthConfig(),
  );

  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await axios.delete(API_URL, getAuthConfig());

  return response.data;
};
