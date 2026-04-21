const Product = require("../models/Product"); // ✅ proper import

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const { title, description, price, stock, category, brand } = req.body;

    if (!title || !description || !image || !stock || !category || !brand) {
      return res.status(400).json({ message: "Please fill all inputs" });
    }

    const product = new Product({ title, description, price, stock, category, brand, image });
    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product not created" });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product not updated" });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product not deleted" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const data = req.query;
    let filter = {};
    if (data.category) filter.category = data.category;
    if (data.brand) filter.brand = data.brand;
    if (data.title) filter.title = data.title;

    let sort = {};
    if (data.sort === "price_asc") sort.price = 1;
    else if (data.sort === "price_desc") sort.price = -1;
    else if (data.sort === "newest") sort.createdAt = -1;
    else sort.createdAt = -1;

    const page = Number(data.page) || 1;
    const limit = Number(data.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(filter).sort(sort).limit(limit).skip(skip);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({ products, page, totalPages, totalProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Products could not be fetched" });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name")   // leader ka naam
      .populate("members", "name"); // members ka naam

    res.status(200).json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};