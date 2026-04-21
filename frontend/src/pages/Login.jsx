import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { loginUser } from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      if (user.isadmin) navigate("/dashboard");
      else navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <img src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae" alt="shopping" />
          <h1>Welcome Back</h1>
          <p>Login to continue shopping with ShopEase</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="auth-btn">Login</button>
          </form>
          <p className="auth-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;