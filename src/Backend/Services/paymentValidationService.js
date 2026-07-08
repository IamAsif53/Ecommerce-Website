import sslcz from "../utils/sslCommerz.js";

//====================================================
// Validate SSLCommerz Payment
//====================================================

export const validateSSLPayment = async (valId) => {
  try {
    //--------------------------------------------------
    // Validate Transaction
    //--------------------------------------------------

    const validation = await sslcz.validate({
      val_id: valId,
    });

    //--------------------------------------------------
    // No Response
    //--------------------------------------------------

    if (!validation) {
      throw new Error("No response received from SSLCommerz.");
    }

    //--------------------------------------------------
    // Payment Status
    //--------------------------------------------------

    if (validation.status !== "VALID" && validation.status !== "VALIDATED") {
      throw new Error("Payment validation failed.");
    }

    //--------------------------------------------------
    // Return Complete Validation Object
    //--------------------------------------------------

    return validation;
  } catch (error) {
    console.error("SSL Validation Error:", error);

    throw error;
  }
};
