import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Product.scss";
import { IoHeartOutline, IoCreateOutline } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";
import { addToCart, addToWishList } from "../../actions/cartActions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

const Product = () => {
  const location = useLocation();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { id } = useParams();
  const isAdmin = userLogin.userInfo?.role
    ? userLogin.userInfo?.role == "admin"
    : false;
  useEffect(() => {
    if (location?.state?.product) {
      setProduct(location?.state?.product);
    } else {
      axios.get(`/api/products/${id}`).then((resp) => {
        setProduct(resp.data);
      });
    }
  }, [location]);

  const addToCartHandler = () => {
    if (qty > 0) {
      dispatch(addToCart(product, qty));
    }
  };

  return (
    <>
      {product ? (
        <section className="py-5">
          <div className="product-container">
            <img
              src={`/mapara/${product.picture}`}
              className="product-image"
              alt="panier"
            />
            <div className="product-details mx-3 mx-md-5">
              <h3>{product.nom}</h3>
              <h4>{product.labo}</h4>
              <p>{product.description}</p>

              <h5>{product.prix} MAD</h5>
              <div className="add-qty-product mb-3">
                <InputGroup>
                  <Button
                    variant="dark"
                    onClick={() => {
                      qty > 0 && setQty((prev) => prev - 1);
                    }}
                  >
                    -
                  </Button>

                  <Form.Control
                    className="qty-form"
                    readOnly
                    placeholder={qty}
                    type="text"
                  />
                  <Button
                    variant="dark"
                    onClick={() => setQty((prev) => prev + 1)}
                  >
                    +
                  </Button>
                </InputGroup>
              </div>
              <div className="add-product">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addToCartHandler}
                >
                  Ajouter au Panier
                </button>
                <i
                  className="pe-2"
                  onClick={() => dispatch(addToWishList(product))}
                >
                  <IoHeartOutline className="card-icon" />
                </i>
              </div>
              <hr className="hr" />
              {isAdmin ? (
                <Link to="/dashboard/modify" state={{ product: product }}>
                  <IoCreateOutline className="user-icon" />
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className="product-container mx-auto my-5 p-5">
          <Alert variant="danger">
            <h3>Le produit que vous recherchez n'existe pas</h3>
          </Alert>
        </div>
      )}
    </>
  );
};

export default Product;
