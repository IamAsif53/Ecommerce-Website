import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/contact`;

export const sendContactMessage = async (contactData) => {
  const response = await axios.post(API_URL, contactData);

  return response.data;
};
