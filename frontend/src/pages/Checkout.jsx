import React, { useEffect, useState } from "react";
import "../styles/checkout.css";
import { getCart, createPayment, verifyPayment } from "../api/api";

export default function Checkout() {

  const [cartItems, setCartItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  // Fetch cart
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

  // form handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

 const handlePayment = async () => {

  try {

    const res = await createPayment();

    const options = {
      key: "rzp_test_SNqr7c19Q2Sx08",
      amount: res.data.amount,
      currency: res.data.currency,
      order_id: res.data.id,
      name: "My Store",
      description: "Order Payment",

      handler: async function (response) {

        await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        });

        alert("Payment Successful");

      }

    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {

      console.log(response.error);
      alert(response.error.description);

    });

    rzp.open();

  } catch (error) {

    console.log(error);
    alert(error.response?.data?.message);

  }

};

  return (

    <div className="checkout-wrapper">

      <h2>Checkout</h2>

      <div className="checkout-container">

        {/* Address form */}
        <div className="checkout-form">

          <h3>Shipping Address</h3>

          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <textarea name="address" placeholder="Address" onChange={handleChange}/>
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />

          <button onClick={handlePayment} className="place-order-btn">
            Pay ₹{totalPrice}
          </button>

        </div>

        {/* Order summary */}
        <div className="checkout-summary">

          <h3>Order Summary</h3>

          {cartItems.map((item) => (

            <div className="summary-product" key={item._id}>

              <img
                src={`http://localhost:5000/uploads/${item.product.image}`}
                alt={item.product.title}
              />

              <div>

                <div className="product-title">
                  {item.product.title}
                </div>

                <div>
                  ₹{item.price} × {item.quantity}
                </div>

              </div>

              <div>
                ₹{item.price * item.quantity}
              </div>

            </div>

          ))}

          <hr/>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

        </div>

      </div>

    </div>

  );
}