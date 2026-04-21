import "../styles/category.css";
import Men from "../assets/men.png";
import Shoe from "../assets/shoe.png";
import Women from "../assets/women.png";
import Electronics from "../assets/electronic.png";
import Assesories from "../assets/assesories.png";
import Sport from "../assets/sport.png";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();

  const categories = [
    { name: "Men", img: Men },
    { name: "Women", img: Women },
    { name: "Electronics", img: Electronics },
    { name: "Shoes", img: Shoe },
    { name: "Accessories", img: Assesories },
    { name: "Sports", img: Sport },
  ];

  // Navigate to Shop page with category
  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <section className="category">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((item, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategoryClick(item.name)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.name} />
            <div className="category-overlay">
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}