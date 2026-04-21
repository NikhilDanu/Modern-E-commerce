const razorpay = require("../utils/payment");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const crypto = require("crypto");

// ---------------------- Create Razorpay Order ----------------------
exports.createPaymentOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const cart = await Cart.findOne({ user });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total directly from cart items
    const total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const amount = total * 100; // Convert to paise for Razorpay

    if (amount < 100) {
      return res.status(400).json({ message: "Minimum order amount ₹1 required" });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.log("Create Payment Order Error:", error);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

// ---------------------- Verify Payment ----------------------
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const user = req.user.id;
    const cart = await Cart.findOne({ user });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate totals from cart items
    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    // Create order record
    const orderData = {
      user,
      items: cart.items,
      totalPrice,
      totalItems,
      paymentStatus: "paid",
      razorpay_payment_id,
    };

    const order = await Order.create(orderData);

    // Clear cart after successful payment
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;
    await cart.save();

    res.json({ message: "Payment successful", order });

  } catch (error) {
    console.log("Verify Payment Error:", error);
    res.status(500).json({ message: "Payment verification error" });
  }
};