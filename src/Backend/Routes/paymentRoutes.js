import express from "express";

import {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIPN,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//-----------------------------------------
// Payment
//-----------------------------------------

router.post("/initiate", protect, initiatePayment);

//-----------------------------------------
// SSLCommerz Callbacks
//-----------------------------------------

router.post("/success", paymentSuccess);

router.post("/fail", paymentFail);

router.post("/cancel", paymentCancel);

router.post("/ipn", paymentIPN);

export default router;
