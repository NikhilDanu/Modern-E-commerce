import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import { getCart } from "../api/api";
import { Link } from "react-router-dom";

export default function Cart() {

const [cartItems, setCartItems] = useState([]);

useEffect(() => {

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  fetchCart();

}, []);


// total price calculate
const totalPrice = cartItems.reduce(
(total,item)=> total + item.price * item.quantity,
0
);


return (

<div className="cart-wrapper">

{/* LEFT SIDE PRODUCTS */}

<div className="cart-left">

<h2>Shopping Cart</h2>

{cartItems.length === 0 ? (

<p>Your cart is empty</p>

) : (

cartItems.map((item)=>(
  
<div className="items-list" key={item._id}>

<div className="img">

<img
src={`http://localhost:5000/uploads/${item.product.image}`}
alt={item.product.title}
/>

</div>

<div className="item">

<div className="itemname">
{item.product.title}
</div>

<div className="itemprice">
₹{item.price}
</div>

<div>
Qty : {item.quantity}
</div>

<button className="btn">
Remove
</button>

</div>

</div>

))

)}

</div>


{/* RIGHT SIDE SUMMARY */}

<div className="cart-right">

<h3>Order Summary</h3>

<div className="summary-row">

<span>Total Items</span>

<span>{cartItems.length}</span>

</div>

<div className="summary-row">

<span>Total Price</span>

<span>₹{totalPrice}</span>

</div>

<Link to="/checkout">

<button className="order-btn">

<Link to="/checkout"> Place Order 🚀</Link>

</button>

</Link>

</div>

</div>

);
}