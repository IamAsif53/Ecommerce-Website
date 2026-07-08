import sslcz from "../utils/sslCommerz.js";
import PendingPayment from "../models/PendingPayment.js";

import { validateSSLPayment } from "../services/paymentValidationService.js";
import { processSuccessfulPayment } from "../services/paymentService.js";
//--------------------------------------------------
// Initiate Payment
//--------------------------------------------------

export const initiatePayment = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      city,
      postalCode,
      country,
      items,
      totalPrice,
    } = req.body;

    const transactionId =
      "TXN_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    //--------------------------------------------------
    // Save Pending Payment
    //--------------------------------------------------

    await PendingPayment.create({
      user: req.user.id,

      transactionId,

      customerName,

      phone,

      address,

      city,

      postalCode,

      country,

      paymentMethod: "SSLCommerz",

      items,

      totalPrice,
    });

    const data = {
      total_amount: totalPrice,

      currency: "BDT",

      tran_id: transactionId,

      success_url: `${process.env.BACKEND_URL}/api/payment/success`,

      fail_url: `${process.env.BACKEND_URL}/api/payment/fail`,

      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel`,

      ipn_url: `${process.env.BACKEND_URL}/api/payment/ipn`,

      shipping_method: "Courier",

      product_name: "Techit Products",

      product_category: "Electronics",

      product_profile: "general",

      // Customer Information
      cus_name: customerName,

      cus_email: req.user.email,

      cus_add1: address,

      cus_city: city,

      cus_postcode: postalCode,

      cus_country: country,

      cus_phone: phone,

      // Shipping Information (Required)
      ship_name: customerName,

      ship_add1: address,

      ship_add2: "",

      ship_city: city,

      ship_state: city,

      ship_postcode: postalCode,

      ship_country: country,

      // Product Info
      num_of_item: items.length,
    };

    const response = await sslcz.init(data);

    console.log("========== SSL RESPONSE ==========");
    console.log(response);
    console.log("Gateway URL:", response?.GatewayPageURL);

    if (!response || !response.GatewayPageURL) {
      return res.status(500).json({
        success: false,
        message: "SSLCommerz did not return a GatewayPageURL.",
        response,
      });
    }

    return res.status(200).json({
      success: true,
      paymentUrl: response.GatewayPageURL,
      transactionId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//--------------------------------------------------
// Payment Success
//--------------------------------------------------

export const paymentSuccess = async (req, res) => {
  try {
    console.log("========== PAYMENT SUCCESS ==========");
    console.log(req.body);

    const { val_id, tran_id } = req.body;

    //--------------------------------------------------
    // Validate payment with SSLCommerz
    //--------------------------------------------------

    const validation = await validateSSLPayment(val_id);

    if (validation.status !== "VALID" && validation.status !== "VALIDATED") {
      throw new Error("Payment validation failed.");
    }

    //--------------------------------------------------
    // Create Order
    //--------------------------------------------------

    const order = await processSuccessfulPayment({
      validation,
    });

    console.log("Order Created:", order._id);

    return res.redirect(
      `${process.env.FRONTEND_URL}/order-success?orderId=${order._id}`,
    );
  } catch (error) {
    console.error("Payment Success Error:", error);

    return res.redirect(`${process.env.FRONTEND_URL}/checkout`);
  }
};

//--------------------------------------------------
// Payment Failed
//--------------------------------------------------

export const paymentFail = async (req, res) => {
  try {
    console.log("========== PAYMENT FAILED ==========");
    console.log(req.body);

    const { tran_id } = req.body;

    if (tran_id) {
      await PendingPayment.deleteOne({
        transactionId: tran_id,
      });
    }

    return res.redirect(`${process.env.FRONTEND_URL}/checkout`);
  } catch (error) {
    console.error("Payment Fail Error:", error);

    return res.redirect(`${process.env.FRONTEND_URL}/checkout`);
  }
};

//--------------------------------------------------
// Payment Cancelled
//--------------------------------------------------

export const paymentCancel = async (req, res) => {
  try {
    console.log("========== PAYMENT CANCELLED ==========");
    console.log(req.body);

    const { tran_id } = req.body;

    if (tran_id) {
      await PendingPayment.deleteOne({
        transactionId: tran_id,
      });
    }

    return res.redirect(`${process.env.FRONTEND_URL}/checkout`);
  } catch (error) {
    console.error("Payment Cancel Error:", error);

    return res.redirect(`${process.env.FRONTEND_URL}/checkout`);
  }
};

//--------------------------------------------------
// IPN (Instant Payment Notification)
//--------------------------------------------------

export const paymentIPN = async (req, res) => {
  try {
    console.log("========== PAYMENT IPN ==========");
    console.log(req.body);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Payment IPN Error:", error);

    return res.status(500).json({
      success: false,
    });
  }
};
