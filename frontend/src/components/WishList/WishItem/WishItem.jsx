import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../../Cart/CartItem/CartItem.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromWishList } from "../../../actions/cartActions";

import { IoTrashOutline } from "react-icons/io5";

const WishItem = ({ item }) => {
  const addToCartHandler = () => {
    if (qty > 0) {
      dispatch(addToCart(item, qty));
    }
  };

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const addQtyHandler = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQtyHandler = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };
  return (
    <>
      <div className="bag-item-container  my-3 me-3">
        <Link
          className="bag-item-image"
          replace
          to={`/product/${item._id}`}
          state={{ product: item }}
        >
          <img
            src={`/images/${item.image}`}
            className="bag-item-image"
            alt="panier"
          />
        </Link>
        <div className="bag-item-details">
          <Link replace to={`product/${item._id}`} state={{ product: item }}>
            <h6>{item.name}</h6>
          </Link>
          <p className="small ">{item.marque}</p>
          <p className="text-muted small">{item.price} MAD</p>

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
          <button
            type="button"
            className="btn btn-success btn-sm add-qty-bag-item mt-3"
            onClick={addToCartHandler}
          >
            Ajouter au Panier
          </button>
        </div>
        <div className="bag-item-price">
          <p>{parseFloat(item.price * qty).toFixed(2)} MAD</p>

          <i onClick={() => dispatch(removeFromWishList(item._id))}>
            <IoTrashOutline className="bag-item-icon" />
          </i>
        </div>
      </div>
    </>
  );
};

export default WishItem;
