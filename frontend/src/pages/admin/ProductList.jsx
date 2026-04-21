import { useEffect, useState } from "react";
import "../../styles/products.css";
import { getAllProducts } from "../../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from products
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (err) {
        console.log("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="products-page">
        <div className="hero-section">
          <h1 className="page-title">Our Collection</h1>
          <p className="hero-subtitle">Discover premium products crafted for you</p>
        </div>
        <div className="products-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="product-card skeleton">
              <div className="product-image shimmer"></div>
              <div className="product-info">
                <div className="shimmer title"></div>
                <div className="shimmer brand"></div>
                <div className="shimmer price"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="page-title">Our Collection</h1>
        <p className="hero-subtitle">Discover premium products crafted for you</p>

        {/* Search & Filter Bar */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products match your criteria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.title}
                  loading="lazy"
                />
              </div>
              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-brand">{product.brand}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
                <button className="view-btn">View Product</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}