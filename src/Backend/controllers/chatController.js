import { generateAIResponse } from "../services/cloudflareAIService.js";
import Product from "../models/Product.js";
import Settings from "../models/Settings.js";
import ChatHistory from "../models/ChatHistory.js";
import { extractSearchIntent } from "../utils/extractSearchIntent.js";
import { extractIntent } from "../services/intentService.js";
/*
|--------------------------------------------------------------------------
| Product Related Keywords
|--------------------------------------------------------------------------
*/

const PRODUCT_KEYWORDS = [
  "product",
  "products",
  "phone",
  "mobile",
  "iphone",
  "samsung",
  "xiaomi",
  "realme",
  "oppo",
  "vivo",
  "laptop",
  "macbook",
  "computer",
  "monitor",
  "keyboard",
  "mouse",
  "headphone",
  "earbuds",
  "speaker",
  "camera",
  "watch",
  "tablet",
  "gaming",
  "accessory",
  "brand",
  "price",
  "stock",
  "available",
  "availability",
  "buy",
  "purchase",
  "recommend",
];

/*
|--------------------------------------------------------------------------
| Check Whether User Is Asking About Products
|--------------------------------------------------------------------------
*/

const isProductQuery = (message) => {
  const text = message.toLowerCase();

  return PRODUCT_KEYWORDS.some((keyword) => text.includes(keyword));
};

/*
|--------------------------------------------------------------------------
| Build Product Context
|--------------------------------------------------------------------------
*/

const buildProductContext = (products, currency) => {
  if (!products.length) {
    return "No matching products were found.";
  }

  return products
    .map(
      (product) => `
Name: ${product.name}
Brand: ${product.brand}
Category: ${product.category}
Price: ${currency}${product.price}
Stock: ${product.stock}
Description: ${product.description}
`,
    )
    .join("\n----------------------------------------\n");
};
/*
|--------------------------------------------------------------------------
| Load Store Settings
|--------------------------------------------------------------------------
*/

const getStoreInformation = async () => {
  const settings = await Settings.findOne();

  return {
    storeName: settings?.storeName || "Techit",
    shippingTime: settings?.shippingTime || "3-5 Business Days",
    taxRate: settings?.taxRate || 0,
    currency: settings?.currency || "৳",
    supportEmail: settings?.contactEmail || process.env.EMAIL_USER,
    phone: settings?.phone || "Not Available",
    address: settings?.address || "Not Available",
    paymentMethods: settings?.paymentMethods || "SSLCommerz, Cash on Delivery",
    returnPolicy: settings?.returnPolicy || "7 Days",
  };
};

/*
|--------------------------------------------------------------------------
| Search Relevant Products
|--------------------------------------------------------------------------
*/

const searchProducts = async (message) => {
  let intent = extractSearchIntent(message);

  const noIntentFound =
    !intent.brand &&
    !intent.category &&
    !intent.minPrice &&
    !intent.maxPrice &&
    !intent.keyword &&
    !intent.sort;

  if (noIntentFound) {
    intent = await extractIntent(message);
  }
  const filter = {};

  if (intent.brand) {
    filter.brand = new RegExp(intent.brand, "i");
  }

  if (intent.category) {
    filter.category = new RegExp(intent.category, "i");
  }

  if (intent.inStock) {
    filter.stock = { $gt: 0 };
  }

  if (intent.minPrice || intent.maxPrice) {
    filter.price = {};

    if (intent.minPrice) {
      filter.price.$gte = intent.minPrice;
    }

    if (intent.maxPrice) {
      filter.price.$lte = intent.maxPrice;
    }
  }

  if (intent.keyword) {
    filter.description = new RegExp(intent.keyword, "i");
  }

  let sort = {};

  if (intent.sort === "priceAsc") {
    sort.price = 1;
  }

  if (intent.sort === "priceDesc") {
    sort.price = -1;
  }

  return await Product.find(filter)
    .sort(sort)
    .limit(10)
    .select("name brand category price stock description");
};
/*
|--------------------------------------------------------------------------
| Build AI Prompt
|--------------------------------------------------------------------------
*/

const buildMessages = async (userMessage) => {
  const store = await getStoreInformation();

  let productContext = "No product information was required.";

  if (isProductQuery(userMessage)) {
    const products = await searchProducts(userMessage);

    productContext = buildProductContext(products, store.currency);
  }

  return [
    {
      role: "system",
      content: `
You are the official AI shopping assistant of ${store.storeName}.

========================
STORE INFORMATION
========================

Store Name:
${store.storeName}

Shipping Time:
${store.shippingTime}

Payment Methods:
${store.paymentMethods}

Return Policy:
${store.returnPolicy}

Tax Rate:
${store.taxRate}%

Currency:
${store.currency}

Support Email:
${store.supportEmail}

Phone:
${store.phone}

Address:
${store.address}

========================
AVAILABLE PRODUCTS
========================

${productContext}

========================
YOUR RESPONSIBILITIES
========================

You help customers with:

• Product recommendations
• Product availability
• Product prices
• Product comparisons
• Orders
• Shipping
• Returns
• Warranty
• Payments
• General store information

========================
RULES
========================

1. You are an employee of ${store.storeName}.

2. Never mention Cloudflare, Llama, Meta or any AI provider.

3. Never invent products.

4. Recommend products only from the provided product list.

5. If a requested product is unavailable, politely inform the customer.

6. If you don't know something, admit it politely.

7. Keep answers professional.

8. Keep answers concise unless the customer requests details.

9. Always answer like a premium customer support representative.

10. Use the store name naturally in conversations.
`,
    },
    {
      role: "user",
      content: userMessage,
    },
  ];
};

/*
|--------------------------------------------------------------------------
| Main Chat Controller
|--------------------------------------------------------------------------
*/

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    let chatHistory = await ChatHistory.findOne({
      user: userId,
    });

    if (!chatHistory) {
      chatHistory = await ChatHistory.create({
        user: userId,
        messages: [],
      });
    }

    const previousMessages = chatHistory.messages.slice(-20);

    const systemMessages = await buildMessages(message);

    const messages = [
      systemMessages[0],
      ...previousMessages,
      {
        role: "user",
        content: message,
      },
    ];
    const reply = await generateAIResponse(messages);
    chatHistory.messages.push({
      role: "user",
      content: message,
    });

    chatHistory.messages.push({
      role: "assistant",
      content: reply,
    });

    if (chatHistory.messages.length > 20) {
      chatHistory.messages = chatHistory.messages.slice(-20);
    }

    await chatHistory.save();
    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
};

export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    await ChatHistory.findOneAndUpdate(
      { user: userId },
      {
        messages: [],
      },
    );

    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully.",
    });
  } catch (error) {
    console.error("Clear Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear chat history.",
    });
  }
};
