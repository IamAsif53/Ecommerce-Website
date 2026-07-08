import Order from "../models/Order.js";
import { createOrderService } from "../services/orderService.js";

//====================================================
// Create Order
//====================================================

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      city,
      postalCode,
      country,
      paymentMethod,
      items,
      totalPrice,
    } = req.body;

    const user = req.user.id;

    const order = await createOrderService({
      user,

      customerName,

      phone,

      address,

      city,

      postalCode,

      country,

      paymentMethod,

      paymentStatus: paymentMethod === "Cash On Delivery" ? "Pending" : "Paid",

      paymentGateway: paymentMethod === "SSLCommerz" ? "SSLCommerz" : "",

      items,

      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//====================================================
// Get All Orders
//====================================================

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//====================================================
// Get Logged-in User Orders
//====================================================

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//====================================================
// Get Single Order
//====================================================

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // User can only view their own order unless admin
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//====================================================
// Update Order Status
//====================================================

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
