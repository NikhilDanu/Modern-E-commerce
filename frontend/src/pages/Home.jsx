// import { color, motion } from "framer-motion";
// import "../styles/home.css";
// import video from "../assets/video.mp4";
// import Men from "../assets/men.png";
// import Shoe from "../assets/shoe.png";
// import Women from "../assets/women.png";
// import Electronics from "../assets/electronic.png";
// import { useEffect, useState } from "react";
// import { getAllProducts , addCart } from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const [product, setProduct] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAllProducts();
//         setProduct(res.data.products);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (id) => {
//     try {
//       const res = await addCart({
//         productId: id,
//         quantity: 1
//       });
//       alert(res.data.message || "Product added to cart");
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   // Navigate to Shop page with category
//   const handleCategoryClick = (category) => {
//     navigate(`/shop?category=${category}`);
//   };

//   return (
//     <div className="home">
//       {/* HERO SECTION */}
//       <section className="hero">
//         <video
//           className="hero-video"
//           src={video}
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//         <div className="hero-content">
//           <motion.h1
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Premium Shopping Experience
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             Discover high quality products with modern style and unbeatable prices.
//           </motion.p>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="shop-btn"
//             onClick={() => navigate("/shop")}
//           >
//             Shop Now
//           </motion.button>
//         </div>
//       </section>

//       {/* CATEGORY SECTION */}
//       <section className="category">
//         <h2>Shop By Category</h2>
//         <div className="category-grid">
//           {[
//             { name: "Men", img: Men },
//             { name: "Women", img: Women  },
//             { name: "Electronics", img: Electronics },
//             { name: "Shoes", img: Shoe },
//           ].map((cat, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="cat-card"
//               onClick={() => handleCategoryClick(cat.name)}
//             >
//               <img src={cat.img} alt={cat.name} />
//               <h3>{cat.name}</h3>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* FEATURED PRODUCTS */}
//       <section className="featured">
//         <h2>Featured Products</h2>

//         {loading ? (
//           <div className="loader">Loading products...</div>
//         ) : product.length === 0 ? (
//           <div className="no-data">No products found</div>
//         ) : (
//           <div className="product-grid">
//             {product.map((item) => (
//               <div className="product-card" key={item._id}>
//                 <div className="product-img">
//                   <img
//                     src={`http://localhost:5000/uploads/${item.image}`}
//                     alt={item.title}
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="product-info">
//                   <h3 className="product-title">{item.title}</h3>
//                   <p className="product-desc">{item.description}</p>
//                   <div className="product-bottom">
//                     <h4 className="product-price">₹{item.price}</h4>
//                     <button onClick={()=> handleSubmit(item._id)} className="cart-btn">Add to Cart</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import "../styles/home.css";
import video from "../assets/video.mp4";
import Men from "../assets/men.png";
import Shoe from "../assets/shoe.png";
import Women from "../assets/women.png";
import Electronics from "../assets/electronic.png";
import { useEffect, useState } from "react";
import { getAllProducts , addCart } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 ADD THIS
  const [visibleCount, setVisibleCount] = useState(4);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProducts();
        setProduct(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (id) => {
    try {
      const res = await addCart({
        productId: id,
        quantity: 1
      });
      alert(res.data.message || "Product added to cart");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <div className="home">
      
 
      <section className="hero">
        <video
          className="hero-video"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium Shopping Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover high quality products with modern style and unbeatable prices.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shop-btn"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </motion.button>
        </div>
      </section>

      <section className="category">
        <h2>Shop By Category</h2>
        <div className="category-grid">
          {[
            { name: "Men", img: Men },
            { name: "Women", img: Women },
            { name: "Electronics", img: Electronics },
            { name: "Shoes", img: Shoe },
          ].map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="cat-card"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>

        {loading ? (
          <div className="loader">Loading products...</div>
        ) : product.length === 0 ? (
          <div className="no-data">No products found</div>
        ) : (
          <>
            <div className="product-grid">

              {product.slice(0, visibleCount).map((item) => (
                <div className="product-card" key={item._id}>
                  <div className="product-img">
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="product-info">
                    <h3 className="product-title">{item.title}</h3>
                    <p className="product-desc">{item.description}</p>

                    <div className="product-bottom">
                      <h4 className="product-price">₹{item.price}</h4>
                      <button
                        onClick={()=> handleSubmit(item._id)}
                        className="cart-btn"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {visibleCount < product.length && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                  className="show-more-btn"
                  onClick={() => setVisibleCount(prev => prev + 4)}
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}