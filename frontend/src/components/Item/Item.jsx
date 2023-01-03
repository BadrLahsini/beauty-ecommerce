import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Item.scss";
import { IoBagAddOutline, IoHeartOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, addToWishList } from "../../actions/cartActions";

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const addOneToCartHandler = () => {
    dispatch(addToCart(item, 1));
  };

  return (
    <Card className=" main-card ">
      <Link to={`/product/${item._id}`} state={{ product: item }}>
        <img
          src={`
          /mapara/${item.picture}`}
        />
      </Link>
      <Link to={`/product/${item._id}`} state={{ product: item }}>
        <Card.Body className="card-body">
          <Card.Text className="card-marque">{item.labo}</Card.Text>
          <p className="text-primary card-name">
            <small>{item.nom}</small>
          </p>

          <Card.Text className="card-price">
            {item.prix.toFixed(2)} MAD
          </Card.Text>
        </Card.Body>
      </Link>

      <div className="card-action pb-1 pt-1 mx-2">
        <i onClick={addOneToCartHandler}>
          <BsCartPlus className="card-icon" />
        </i>
        <i onClick={() => dispatch(addToWishList(item))}>
          <IoHeartOutline className="card-icon" />
        </i>
      </div>
    </Card>
  );
};

export default Item;
