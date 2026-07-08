import PendingPayment from "../models/PendingPayment.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { createOrderService } from "./orderService.js";

//====================================================
// Process Successful Payment
//====================================================

export const processSuccessfulPayment = async ({ validation }) => {
  try {
    //--------------------------------------------------
    // Extract Validation Data
    //--------------------------------------------------

    const transactionId = validation.tran_id;
    const valId = validation.val_id;

    //--------------------------------------------------
    // Find Pending Payment
    //--------------------------------------------------

    const pendingPayment = await PendingPayment.findOne({
      transactionId,
    });

    if (!pendingPayment) {
      throw new Error("Pending payment not found.");
    }

    //--------------------------------------------------
    // Verify Amount
    //--------------------------------------------------

    if (Number(validation.amount) !== Number(pendingPayment.totalPrice)) {
      throw new Error("Payment amount mismatch.");
    }

    //--------------------------------------------------
    // Prevent Duplicate Order
    //--------------------------------------------------

    const existingOrder = await Order.findOne({
      transactionId,
    });

    if (existingOrder) {
      return existingOrder;
    }

    //--------------------------------------------------
    // Create Final Order
    //--------------------------------------------------

    const order = await createOrderService({
      user: pendingPayment.user,

      customerName: pendingPayment.customerName,

      phone: pendingPayment.phone,

      address: pendingPayment.address,

      city: pendingPayment.city,

      postalCode: pendingPayment.postalCode,

      country: pendingPayment.country,

      paymentMethod: "SSLCommerz",

      paymentStatus: "Paid",

      paymentGateway: "SSLCommerz",

      transactionId,

      valId,

      paidAt: new Date(),

      items: pendingPayment.items,

      totalPrice: pendingPayment.totalPrice,
    });

    //--------------------------------------------------
    // Delete Pending Payment
    //--------------------------------------------------

    await PendingPayment.deleteOne({
      _id: pendingPayment._id,
    });

    //--------------------------------------------------
    // Clear User Cart
    //--------------------------------------------------

    await Cart.findOneAndUpdate(
      {
        user: pendingPayment.user,
      },
      {
        items: [],
      },
    );

    return order;
  } catch (error) {
    console.error("Payment Service Error:", error);

    throw error;
  }
};
