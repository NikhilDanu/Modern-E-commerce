import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h3>ShopEase</h3>
          <p>
            Your one stop shop for electronics, fashion and daily needs.
            Quality products with best prices.
          </p>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>Return Policy</li>
            <li>Shipping Info</li>
            <li>Track Order</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Login</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>YouTube</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopEase. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;