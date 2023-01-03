import "./Shipping.scss";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { createOrder } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [infos, setinfos] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (userInfo) {
      setphone(userInfo.phone);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems.reduce((prev, curr) => {
    return parseFloat((prev + curr.product.prix * curr.qty).toFixed(2));
  }, 0);

  const livraison = 30;

  const orderHandler = (e) => {
    e.preventDefault();
    handleShow();
  };

  const placeOrderHandler = () => {
    disptach(
      createOrder({
        shippingUser: { firstName: prenom, lastName: name, phone, email },
        orderItems: cartItems,
        shippingAddress: { address, city, region },
        paymentMethod: "livraison",
        shippingPrice: livraison,
        totalPrice: total,
        comments: infos,
      })
    );
    handleClose();
    navigate(
      { pathname: `/message/success` },
      { state: { message: "Votre commande a ete valide avec succes" } }
    );
  };

  return (
    <div className="ShippingContainer">
      <form onSubmit={orderHandler}>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Coordonnées</h5>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">Prenom*</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Nom*</label>
                    <div className="form-outline">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Telephone*</label>
                  <input
                    type="number"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Addresse de livraison*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setaddress(e.target.value)}
                    required
                  />
                </div>

                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">Ville*</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Region*</label>
                    <div className="form-outline">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setRegion(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">
                    Informations complementaires
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    onChange={(e) => setinfos(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Resume de votre commande</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Produits
                    <span>{total} MAD</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Livraison
                    <span>{livraison} MAD</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                    <div>
                      <strong>Total</strong>
                    </div>
                    <span>
                      <strong>{livraison + total} MAD</strong>
                    </span>
                  </li>
                </ul>
                <div className="form-check  mb-3">
                  <input className="form-check-input me-2" type="checkbox" />
                  <label className="form-check-label">
                    <small>j'accepte les termes et conditions</small>
                  </label>
                </div>
                <button className="btn btn-success " type="submit">
                  Valider la commande
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resume de votre commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`${prenom} ${name}`}</p>
          <p>{`telephone : ${phone}`}</p>
          <p>{`addresse : ${address}`}</p>
          <p>{`ville : ${city}`}</p>
          <p>{`region : ${region}`}</p>
          <p>{`email : ${email}`}</p>
          <p>{`montant : ${livraison + total} MAD`}</p>
          <p>{`Informations complementaires : ${infos}`}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success " onClick={placeOrderHandler}>
            Commander
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Shipping;
