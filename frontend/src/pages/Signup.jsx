import React, { useState } from "react";
import "../styles/signup.css";
import { signupUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirm , setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form clicked!"); 
  try {
    const user = await signupUser({ name, email, password});
    console.log("register successfully", user.data);
    alert("Register successfully");
    navigate("/login");
  } catch (err) {
    console.log("Signup failed", err);
   alert(err.response?.data?.message);
  }
};
  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>Join Notes App!</h1>
        <p>
          Keep all your thoughts, tasks, and ideas in one place.<br />
          Sign up and start organizing your life effortlessly.
        </p>
      </div>

      <div className="signup-right">
        <div className="signup-box">
          <h2>Create Account</h2>
         <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
         <p className="login-text">
  Already have an account? <Link to="/login">Login</Link>
</p>
        </div>
        </div>
    </div>
  );
};

export default Signup;