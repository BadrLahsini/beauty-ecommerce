import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./CartItem.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../actions/cartActions";

import { IoTrashOutline } from "react-icons/io5";

const CartItem = ({ item, qty: initialQty }) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(initialQty);
  const addQtyHandler = () => {
    setQty((prev) => prev + 1);
    dispatch(addToCart(item, 1));
  };

  const decreaseQtyHandler = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
      dispatch(addToCart(item, -1));
    } else {
      dispatch(removeFromCart(item._id));
    }
  };
  return (
    <>
      <div className="bag-item-container  my-3 me-3">
        <Link
          className="bag-item-image"
          to={`/product/${item._id}`}
          state={{ product: item }}
        >
          <img
            src={`/mapara/${item.picture}`}
            className="bag-item-image"
            alt="panier"
          />
        </Link>
        <div className="bag-item-details">
          <Link to={`/product/${item._id}`} state={{ product: item }}>
            <h6>{item.nom}</h6>
          </Link>
          <p className="small ">{item.labo}</p>
          <p className="text-muted small">{item.prix} MAD</p>

          <div className="add-qty-bag-item">
            <InputGroup>
              <Button
                variant="dark"
                className="py-1"
                onClick={decreaseQtyHandler}
              >
                -
              </Button>

              <Form.Control
                className="qty-form py-1"
                readOnly
                placeholder={qty}
                type="number"
              />
              <Button variant="dark" className="py-1" onClick={addQtyHandler}>
                +
              </Button>
            </InputGroup>
          </div>
        </div>
        <div className="bag-item-price">
          <p>{parseFloat(item.prix * qty).toFixed(2)} MAD</p>
          <i onClick={() => dispatch(removeFromCart(item._id))}>
            <IoTrashOutline className="bag-item-icon" />
          </i>
        </div>
      </div>
    </>
  );
};

export default CartItem;
