const express = require("express");
const router = express.Router();
const auth = require("../middleware/jwt");

const {
  createPaymentOrder,
  verifyPayment
} = require("../controllers/payment.controller");

router.post("/create-order", auth, createPaymentOrder);
router.post("/verify", auth, verifyPayment);

module.exports = router;