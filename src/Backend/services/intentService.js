import { generateAIResponse } from "./cloudflareAIService.js";

export const extractIntent = async (message) => {
  const prompt = `
You are an intent extraction engine.

Extract shopping information from the user's message.

Return ONLY valid JSON.

Schema:

{
  "category": null,
  "brand": null,
  "minPrice": null,
  "maxPrice": null,
  "sort": null,
  "feature": null,
  "inStock": false
}

Rules:

- Return ONLY JSON.
- No explanation.
- No markdown.
- If missing, use null.

User:

${message}
`;

  try {
    const response = await generateAIResponse([
      {
        role: "user",
        content: prompt,
      },
    ]);

    return JSON.parse(response);
  } catch {
    return {
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      sort: null,
      feature: null,
      inStock: false,
    };
  }
};
