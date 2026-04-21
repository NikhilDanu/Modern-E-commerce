const express = require("express");
const routes = express.Router();
const auth = require("../middleware/jwt");
const admin = require("../middleware/admin");

const { createOrder, myOrder, getOrderById, removeOrder } = require("../controllers/order.controller");
const { getCart } = require("../controllers/cart.controller"); 
routes.post("/", auth, createOrder);      
routes.get("/", auth, myOrder);         
routes.get("/:id", auth, getOrderById); 


routes.delete("/:id", auth, admin, removeOrder); 
routes.get("/all-carts", auth, admin, getCart); 

module.exports = routes;