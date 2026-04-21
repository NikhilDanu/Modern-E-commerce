import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import CreateProduct from "./pages/admin/CreateProduct";
import ProductList from "./pages/admin/ProductList";
import Shop from "./pages/Product";
import Category from "./pages/category";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App(){
  return (
    <Router>
      <Navbar/>


      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/create" element={<CreateProduct/>}/>
        <Route path="/product" element={<ProductList/>}/>
         <Route path="/shop" element={<Shop/>}/>
         <Route path="/category" element={<Category/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/checkout" element={<Checkout/>}/>

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;