// import { useState, useEffect } from "react";
// import "../styles/navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllProducts } from "../api/api";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   // ✅ LOGOUT FUNCTION
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   // Load user and products on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));

//     const fetchProducts = async () => {
//       try {
//         const res = await getAllProducts();
//         setProducts(res.data.products);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Update suggestions
//   useEffect(() => {
//     if (searchTerm === "") {
//       setSuggestions([]);
//     } else {
//       const filtered = products.filter((p) =>
//         p.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSuggestions(filtered.slice(0, 5));
//     }
//   }, [searchTerm, products]);

//   const handleSearchClick = (title) => {
//     setSearchTerm("");
//     setSuggestions([]);
//     navigate(`/shop?search=${encodeURIComponent(title)}`);
//   };

//   return (
//     <div className="navbar">
//       <div className="logo">ESSENTIALS</div>

//       <div className="nav-links">
//         <ul>
//           <li><Link className="navl" to="/">Home</Link></li>
//           <li><Link className="navl" to="/shop">Shop</Link></li>
//           <li><Link className="navl" to="/category">Category</Link></li>
//         </ul>
//       </div>

//       <div className="nav-right">
        
//         {/* SEARCH */}
//         <div className="search-box">
//           <input
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           {suggestions.length > 0 && (
//             <ul className="search-suggestions">
//               {suggestions.map((item) => (
//                 <li key={item._id} onClick={() => handleSearchClick(item.title)}>
//                   {item.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* CART */}
//         <div className="icon cart-icon">
//   <Link to="/cart">🛒</Link>
//   {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
// </div>

//         {/* ✅ USER + LOGOUT */}
//         <div className="icon user-section">
//           {user ? (
//             <>
//               <span className="username">👋 {user.name}</span>
//               <span className="logout-icon" onClick={handleLogout} title="Logout">
//                 🚪
//               </span>
//             </>
//           ) : (
//             <Link to="/login">👤</Link>
//           )}
//         </div>

//         {/* MOBILE ICON */}
//         <div className="menu-icon" onClick={() => setOpen(!open)}>☰</div>
//       </div>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className={`mobile-menu ${open ? "active" : ""}`}>
//           <Link to="/">Home</Link>
//           <Link to="/shop">Shop</Link>
//           <Link to="/category">Category</Link>

//           {/* ✅ MOBILE LOGOUT */}
//           {user ? (
//             <span className="mobile-logout" onClick={handleLogout}>
//               Logout 🚪
//             </span>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;


import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts, getCart } from "../api/api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0); // ✅ NEW

  const navigate = useNavigate();

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ✅ FETCH CART COUNT
  const fetchCart = async () => {
    try {
      const res = await getCart();

      const total = res.data.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      setCartCount(total);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD DATA
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    fetchCart(); // ✅ initial load

    // ✅ LISTENER (REAL-TIME UPDATE)
    const updateCart = () => fetchCart();
    window.addEventListener("cartUpdated", updateCart);

    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  // SEARCH
  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  }, [searchTerm, products]);

  const handleSearchClick = (title) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/shop?search=${encodeURIComponent(title)}`);
  };

  return (
    <div className="navbar">
      <div className="logo">ESSENTIALS</div>

      <div className="nav-links">
        <ul>
          <li><Link className="navl" to="/">Home</Link></li>
          <li><Link className="navl" to="/shop">Shop</Link></li>
          <li><Link className="navl" to="/category">Category</Link></li>
        </ul>
      </div>

      <div className="nav-right">

        {/* SEARCH */}
        <div className="search-box">
          <input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((item) => (
                <li key={item._id} onClick={() => handleSearchClick(item.title)}>
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ CART WITH COUNT */}
        <div className="icon cart-icon">
          <Link to="/cart">🛒</Link>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

        {/* USER */}
        <div className="icon user-section">
          {user ? (
            <>
              <span className="username">👋 {user.name}</span>
              <span className="logout-icon" onClick={handleLogout}>🚪</span>
            </>
          ) : (
            <Link to="/login">👤</Link>
          )}
        </div>

        <div className="menu-icon" onClick={() => setOpen(!open)}>☰</div>
      </div>

      {/* MOBILE */}
      {open && (
        <div className={`mobile-menu ${open ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/category">Category</Link>

          {user ? (
            <span className="mobile-logout" onClick={handleLogout}>
              Logout 🚪
            </span>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;