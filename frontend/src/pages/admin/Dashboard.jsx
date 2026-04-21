import { useState } from "react";
import "../../styles/adminDashboard.css";
import { Link } from "react-router-dom";

export default function AdminDashboard({
  totalUsers = 0,
  totalOrders = 0,
  totalProducts = 0,
  totalSales = "$0",
  users = [],
  onLogout = () => {},
  onCreateUser = () => {},
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateUser(formData);
    setFormData({ name: "", email: "", password: "", role: "User" });
  };

  return (
    <div className="admin-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">🛒 Admin Panel</h2>
        <nav>
          <p className="nav-item active">📊 Dashboard</p>
          <p className="nav-item">
            <Link to="/create">➕ Create Product</Link>
          </p>
          <p className="nav-item">
            <Link to="/product">📦 Products</Link>
            </p>
          <p className="nav-item">🛍️ Orders</p>
          <p className="nav-item">👥 Users</p>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <div className="topbar">
          <h1>Dashboard</h1>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <div>
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🛍️</span>
            <div>
              <h3>Total Orders</h3>
              <p>{totalOrders}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div>
              <h3>Total Products</h3>
              <p>{totalProducts}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <div>
              <h3>Total Sales</h3>
              <p>{totalSales}</p>
            </div>
          </div>
        </div>


        <div className="users-section">
          <div className="create-user">
            <h2>Create User</h2>
            <form className="user-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <button type="submit">Create User</button>
            </form>
          </div>


          <div className="users-list">
            <h2>Users</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}