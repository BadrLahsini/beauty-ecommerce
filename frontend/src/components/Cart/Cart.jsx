import React, { useEffect } from "react";
import CartItem from "./CartItem/CartItem";
import "./Cart.scss";
import products from "../../products";
import { useSelector } from "react-redux";
import Message from "../Message/Message";
import { addToCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems.reduce((prev, curr) => {
    return parseFloat((prev + curr.product.prix * curr.qty).toFixed(2));
  }, 0);

  return (
    <section className="bag-container">
      <div className="checkout-validate mx-3 my-4">
        <h2>Mon Panier</h2>
        <button type="button" className="btn btn-success ">
          Commander
        </button>
      </div>

      {cartItems.map((item) => (
        <div key={item.product._id}>
          <hr className="hr mx-3" />
          <CartItem item={item.product} qty={item.qty}></CartItem>
        </div>
      ))}
      <hr className="hr mx-3" />
      <div className="checkout-validate mx-3 my-4">
        <Link to="/shipping">
          <button type="button" className="btn btn-success ">
            Commander
          </button>
        </Link>
        <div className="checkout-total">
          <h5>Total</h5>
          <h5>{total.toFixed(2)}</h5>
        </div>
      </div>
    </section>
  );
};

export default Cart;
