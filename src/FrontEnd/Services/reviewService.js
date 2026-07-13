import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/reviews`;

// ======================================
// Get Reviews for a Product
// ======================================
export const getProductReviews = async (productId, limit = null) => {
  let url = `${API_URL}/product/${productId}`;

  if (limit) {
    url += `?limit=${limit}`;
  }

  const response = await axios.get(url);

  return response.data;
};

// ======================================
// Get Review Summary
// ======================================
export const getReviewSummary = async (productId) => {
  const response = await axios.get(`${API_URL}/summary/${productId}`);

  return response.data;
};

// ======================================
// Add Review
// ======================================
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
