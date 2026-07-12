import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/reviews`;

// Get reviews for a product
export const getProductReviews = async (productId, limit = null) => {
  let url = `${API_URL}/product/${productId}`;

  if (limit) {
    url += `?limit=${limit}`;
  }

  const response = await axios.get(url);

  return response.data;
};
console.log("API_URL:", API_URL);

// Add review
export const addReview = async (reviewData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await axios.post(API_URL, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
