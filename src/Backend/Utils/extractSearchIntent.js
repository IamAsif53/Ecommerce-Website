export const extractSearchIntent = (message) => {
  const query = message.toLowerCase();

  const intent = {
    brand: null,
    category: null,
    minPrice: null,
    maxPrice: null,
    inStock: false,
    sort: null,
    keyword: null,
  };

  /*
  ----------------------------------------
  Brand
  ----------------------------------------
  */

  const brands = [
    "apple",
    "samsung",
    "xiaomi",
    "realme",
    "oppo",
    "vivo",
    "asus",
    "hp",
    "dell",
    "lenovo",
    "acer",
    "msi",
    "logitech",
    "sony",
    "jbl",
    "anker",
  ];

  intent.brand = brands.find((b) => query.includes(b)) || null;

  /*
  ----------------------------------------
  Category
  ----------------------------------------
  */

  const categories = [
    "phone",
    "mobile",
    "laptop",
    "monitor",
    "keyboard",
    "mouse",
    "headphone",
    "earbuds",
    "speaker",
    "camera",
    "tablet",
    "watch",
  ];

  intent.category = categories.find((c) => query.includes(c)) || null;

  /*
  ----------------------------------------
  Price
  ----------------------------------------
  */

  const number = query.match(/\d+/);

  if (number) {
    const price = Number(number[0]);

    if (
      query.includes("under") ||
      query.includes("below") ||
      query.includes("less than")
    ) {
      intent.maxPrice = price;
    }

    if (
      query.includes("above") ||
      query.includes("over") ||
      query.includes("more than")
    ) {
      intent.minPrice = price;
    }
  }

  /*
  ----------------------------------------
  Stock
  ----------------------------------------
  */

  if (
    query.includes("stock") ||
    query.includes("available") ||
    query.includes("in stock")
  ) {
    intent.inStock = true;
  }

  /*
  ----------------------------------------
  Sorting
  ----------------------------------------
  */

  if (query.includes("cheapest") || query.includes("lowest")) {
    intent.sort = "priceAsc";
  }

  if (
    query.includes("expensive") ||
    query.includes("premium") ||
    query.includes("highest")
  ) {
    intent.sort = "priceDesc";
  }

  /*
  ----------------------------------------
  Recommendation Keywords
  ----------------------------------------
  */

  if (query.includes("gaming")) {
    intent.keyword = "gaming";
  }

  if (query.includes("camera")) {
    intent.keyword = "camera";
  }

  if (query.includes("battery")) {
    intent.keyword = "battery";
  }

  if (query.includes("student")) {
    intent.keyword = "student";
  }

  return intent;
};
