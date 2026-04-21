const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const user = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ user });

    if (!cart) {
      const newCart = new Cart({
        user,
        items: [
          {
            product: productId,
            quantity: Number(quantity),
            price: product.price,
          },
        ],
      });

      const savedCart = await newCart.save();
      return res.status(201).json(savedCart);
    } else {
      const itemExist = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (itemExist) {
        itemExist.quantity += Number(quantity);
      } else {
        cart.items.push({
          product: productId,
          quantity: Number(quantity),
          price: product.price,
        });
      }

      const updatedCart = await cart.save();
      return res.status(200).json(updatedCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
};

exports.removeItem = async(req , res)=>{
  try{
    const user = req.user.id;
    const product = req.params.productId;
    const cartFind = await Cart.findOne({user});
    if(!cartFind){
      return res.status(404).json({message:"cart not find"});
    }
    cartFind.items = cartFind.items.filter(
      (item) => item.product.toString() !== product
    );

    await cartFind.save();

    res.status(200).json(cartFind);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.getCart = async(req , res)=>{
try{
  const user = req.user.id;
  const cart = await Cart.findOne({user}).populate("items.product");
  if(!cart){
    return res.status(404).json({items: []});
  }
   return res.status(200).json(cart);
}catch(error){
  console.log(error);
  res.status(500).json({message:"internal error"});
}
};

exports.updateCart = async (req, res) => {
  try {
    const user = req.user.id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({message:"product not found"});
    }

    const itemFind = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (itemFind) {
      itemFind.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
         price: product.price
      });
    }

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
};

exports.decrease = async (req, res) => {
  try {
    const user = req.user.id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ user });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productFind = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!productFind) return res.status(404).json({ message: "Product not in cart" });
    if (productFind.quantity > 1) {
      productFind.quantity -= 1;
      cart.totalPrice -= productFind.price;
      cart.totalItems -= 1;
    } else {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      cart.totalPrice -= productFind.price;
      cart.totalItems -= 1;
    }

    cart.totalPrice = Math.max(cart.totalPrice, 0);
    cart.totalItems = Math.max(cart.totalItems, 0);

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};