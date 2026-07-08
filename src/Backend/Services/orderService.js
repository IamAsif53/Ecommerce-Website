import Order from "../models/Order.js";
import Product from "../models/Product.js";

//====================================================
// Create Order Service
//====================================================

export const createOrderService = async ({
  user,
  customerName,
  phone,
  address,
  city,
  postalCode,
  country,
  paymentMethod,
  paymentStatus = "Pending",
  paymentGateway = "",
  transactionId = "",
  valId = "",
  paidAt = null,
  items,
  totalPrice,
}) => {
  try {
    //--------------------------------------------------
    // Load Products
    //--------------------------------------------------

    const products = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new Error(`${item.name} not found.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Only ${product.stock} ${product.name}(s) available.`);
      }

      products.push({
        product,
        quantity: item.quantity,
      });
    }

    //--------------------------------------------------
    // Update Inventory
    //--------------------------------------------------

    for (const item of products) {
      item.product.stock -= item.quantity;

      item.product.sold += item.quantity;

      await item.product.save();
    }

    //--------------------------------------------------
    // Create Order
    //--------------------------------------------------

    const order = await Order.create({
      user,

      customerName,

      phone,

      address,

      city,

      postalCode,

      country,

      paymentMethod,

      paymentStatus,

      paymentGateway,

      transactionId,

      valId,

      paidAt,

      items,

      totalPrice,

      status: "Pending",
    });

    return order;
  } catch (error) {
    console.error("Order Service Error:", error);

    throw error;
  }
};
