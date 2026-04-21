import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/shop.css";
import { getAllProducts, addCart } from "../api/api";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  // Get category from URL
  const query = new URLSearchParams(location.search);
  const categoryFromURL = query.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.products);

        // Apply initial category filter
        if (categoryFromURL) {
          setSelectedCategory(categoryFromURL);
          setFilteredProducts(res.data.products.filter(p => p.category === categoryFromURL));
        } else {
          setFilteredProducts(res.data.products);
        }
      } catch (error) {
        console.log(error.response?.data?.message);
        alert(error.response?.data?.message);
      }
    };
    fetchData();
  }, [categoryFromURL]);

  const handleSubmit = async (id) => {
  try {
    const res = await addCart({ productId: id, quantity: 1 });

    // ✅ NAVBAR UPDATE TRIGGER
    window.dispatchEvent(new Event("cartUpdated"));

    alert(res.data.message || "Product added to cart");
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  const applyFilters = (category, priceRange) => {
    let filtered = [...products];

    if (category) filtered = filtered.filter(p => p.category === category);

    switch(priceRange) {
      case "under1000":
        filtered = filtered.filter(p => p.price < 1000); break;
      case "1000-5000":
        filtered = filtered.filter(p => p.price >= 1000 && p.price <= 5000); break;
      case "5000-10000":
        filtered = filtered.filter(p => p.price > 5000 && p.price <= 10000); break;
      case "above10000":
        filtered = filtered.filter(p => p.price > 10000); break;
      default: break;
    }

    setFilteredProducts(filtered);
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    applyFilters(category, selectedPrice);
  }

  const handlePriceFilter = (priceRange) => {
    setSelectedPrice(priceRange);
    applyFilters(selectedCategory, priceRange);
  }

  return (
    <div className="shop">
      <section className="shop-header">
        <h1>{selectedCategory || "All"} Products</h1>
        <p>Discover our latest collection</p>
      </section>

      <section className="shop-container">
        <div className="filter">
          <h3>Categories</h3>
          <ul>
            {["Men","Women","Electronics","Shoes"].map(cat => (
              <li
                key={cat}
                onClick={() => handleCategoryFilter(cat)}
                style={{ fontWeight: selectedCategory===cat?"bold":"normal" }}
              >{cat}</li>
            ))}
            <li onClick={() => handleCategoryFilter(null)}
                style={{ fontWeight: selectedCategory===null?"bold":"normal" }}>All</li>
          </ul>

          <h3>Price</h3>
          <ul>
            {[
              {label:"Under ₹1000", value:"under1000"},
              {label:"₹1000-₹5000", value:"1000-5000"},
              {label:"₹5000-₹10000", value:"5000-10000"},
              {label:"Above ₹10000", value:"above10000"}
            ].map(p=>(
              <li
                key={p.value}
                onClick={()=>handlePriceFilter(p.value)}
                style={{ fontWeight: selectedPrice===p.value?"bold":"normal" }}
              >{p.label}</li>
            ))}
            <li onClick={()=>handlePriceFilter(null)}
                style={{ fontWeight: selectedPrice===null?"bold":"normal" }}>All</li>
          </ul>
        </div>

        <div className="products">
          {filteredProducts.map(item=>(
            <div className="product-card" key={item._id}>
              <div className="product-img">
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title}/>
              </div>
              <div className="product-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="product-bottom">
                  <span>₹{item.price}</span>
                  <button onClick={()=>handleSubmit(item._id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}