const express = require("express");
const mongoose = require("mongoose");
const createAdmin = require("./createadmin");
const cors = require("cors"); 
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log("MongoDB connected ✅")
  createAdmin();
  })
  .catch(err => console.log("MongoDB connection error ❌", err));

// Routes import
const userRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");
const paymentRoutes = require("./routes/payment.routes");

// Routes use
app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});