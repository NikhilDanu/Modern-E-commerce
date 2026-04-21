import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/createProduct.css";
import { createProduct } from "../../api/api";

function CreateProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Use FormData for file upload
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("stock", stock);
      data.append("category", category);
      data.append("brand", brand);
      if (image) data.append("image", image);

      // API call
      await createProduct(data);

      alert("Product created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create product");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="create-product-page">
      <nav className="product-nav">
        <div className="nav-logo">🛒 Admin Panel</div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">← Dashboard</Link>
        </div>
      </nav>

      <div className="create-product-container">
        <div className="create-product-card">
          <h1 className="page-title">Create New Product</h1>

          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Headphones"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="e.g. Electronics"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Sony, Apple"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                placeholder="Write product description..."
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {imagePreview && (
              <div className="image-preview-wrapper">
                <img src={imagePreview} alt="preview" className="image-preview" />
              </div>
            )}

            <div className="form-buttons">
              <button type="submit" className="create-btn">✨ Create Product</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;