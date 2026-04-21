const express = require("express");
const router = express.Router();
const auth = require("../middleware/jwt");

const {
  addToCart,
  removeItem,
  getCart,
  updateCart,
  decrease
} = require("../controllers/cart.controller");

router.post("/add", auth , addToCart);

router.delete("/remove/:productId", auth, removeItem);

router.get("/", auth, getCart);

router.put("/update/:productId", auth, updateCart);

router.put("/decrease/:productId", auth, decrease);

module.exports = router;