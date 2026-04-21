const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  const user = req.user.id;

  try {
    const cart = await Cart.findOne({ user });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const orderData = {
      user: user,
      orderItem: cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      totalPrice: cart.totalPrice,
    };

    const order = await Order.create(orderData);

    cart.items = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;
    await cart.save();

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.myOrder = async (req, res) => {
  const user = req.user.id;
  try {
    const orders = await Order.find({ user }).populate("orderItem.product");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId).populate("orderItem.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};