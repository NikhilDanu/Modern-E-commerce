const express = require("express");
const routes = express.Router();
const auth = require("../middleware/jwt");
const admin = require("../middleware/admin");
const upload = require("../middleware/uploads");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

routes.get("/", getAllProducts);        
routes.get("/:id", getProductById);      

routes.post("/create" ,upload.single("image"), auth, admin, createProduct);   
routes.put("/:id", auth, admin, updateProduct); 
routes.delete("/:id", auth, deleteProduct);

module.exports = routes;