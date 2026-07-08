import axios from "axios";

const MODEL = "@cf/meta/llama-3.1-8b-instruct";

export const generateAIResponse = async (messages) => {
  const ACCOUNT_ID = process.env.CLOUDFARE_ACCOUNT_ID;
  const API_TOKEN = process.env.CLOUDFARE_API_TOKEN;

  console.log("ACCOUNT_ID:", ACCOUNT_ID);
  console.log("TOKEN:", API_TOKEN?.substring(0, 10));

  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
      { messages },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.result.response;
  } catch (error) {
    console.error(
      "Cloudflare AI Error:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to generate AI response.");
  }
};
