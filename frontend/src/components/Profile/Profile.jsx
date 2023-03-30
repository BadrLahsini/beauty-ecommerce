import React, { useState, useEffect } from "react";
import "./Profile.scss";
import axios from "axios";

import { Table, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { IoConstructOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

import { updateUserProfile, logout } from "../../actions/userActions";
import { listMyOrders } from "../../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const Profile = () => {
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);
  const [ordermessage, setorderMessage] = useState(null);

  const [currentOrder, setcurrentOrder] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading, success, error } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const isDashboard = userInfo.role === "admin" || userInfo.role === "sales";

  useEffect(() => {
    if (!userInfo) {
      navigate({
        pathname: `/`,
      });
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setlastName(userInfo.lastName);
      setphone(userInfo.phone ?? "");
      setaddress(userInfo.address?.address ?? "");
      setCity(userInfo.address?.city ?? "");
      setRegion(userInfo.address?.region ?? "");

      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Mots de passe differents !!");
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          name,
          email,
          password,
          phone,
          address: { address, city, region },
        })
      );
      setMessage(null);
    }
  };

  const getOrderStatus = (ord) => {
    if (ord.isDelivered) {
      return { table: "table-success", statut: "livré" };
    }
    if (ord.isSent) {
      return { table: "table-warning", statut: "envoyé" };
    }
    if (ord.isOrdered) {
      return { table: "table-info", statut: "en preparation" };
    }
    return { table: "", statut: "En cours" };
  };

  const disconectHandler = () => {
    dispatch(logout());
    navigate({
      pathname: `/login`,
    });
  };

  const detailsHandler = (order) => {
    setcurrentOrder(order);
    handleShow();
  };

  return (
    <div className="ProfilContainer mx-2 mx-md-5 my-5">
      {isDashboard ? (
        <Link to="/dashboard">
          <IoConstructOutline className="user-icon" />
        </Link>
      ) : (
        <></>
      )}
      <hr />
      <div className="my-4">
        <div className="d-flex justify-content-between my-4">
          <h3>Mon Profil</h3>
          <Button
            className="btn-sm"
            variant="danger"
            onClick={disconectHandler}
          >
            Se Deconnecter
          </Button>
        </div>

        {message && <Alert variant="danger">{message}</Alert>}
        {}
        {success && (
          <Alert variant="success">Votre profil a ete mis a jour</Alert>
        )}
        {loading ? (
          <></>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row className="py-2">
              <Col>
                <Form.Group controlId="firstname">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="py-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="py-2" controlId="telephone">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="py-2" controlId="address">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className="py-2">
              <Col>
                <Form.Group controlId="ville">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="region">
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="py-2" controlId="password">
              <Form.Label>Changer mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nouveau mot de passe"
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="py-2" controlId="confirmPassword">
              <Form.Label>Confirmer mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmer mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-between my-4">
              <Button type="submit" variant="info" className="btn-sm ">
                Mettre a jour
              </Button>
            </div>
          </Form>
        )}
      </div>
      <hr />
      <div className="my-4">
        <h2>Mes commandes</h2>
        {ordermessage && <Alert variant="danger">{ordermessage}</Alert>}
        {loadingOrders ? (
          <></>
        ) : errorOrders ? (
          <Alert variant="danger">{errorOrders}</Alert>
        ) : (
          <Table striped bordered hover responsive className="table-sm  my-3">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                let currValue = getOrderStatus(order);
                return (
                  <tr key={order._id} className={`${currValue.table}`}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice + order.shippingPrice} MAD</td>

                    <td>{currValue.statut}</td>
                    <td>
                      <Button
                        className="btn-sm btn-outline-dark"
                        variant="light"
                        onClick={() => detailsHandler(order)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details de votre commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-info">Contact :</h5>
          <p className="text-info">{`${currentOrder?.shippingUser.firstName} ${currentOrder?.shippingUser.lastName}`}</p>
          <p className="text-info">{`Tel : ${currentOrder?.shippingUser.phone}`}</p>
          <p className="text-info">{`Adresse : ${currentOrder?.shippingAddress.address}, ${currentOrder?.shippingAddress.city}, ${currentOrder?.shippingAddress.region}`}</p>
          <hr />
          <h5 className="">Produits :</h5>
          {currentOrder?.orderItems.map((item) => (
            <p key={item._id} className="">
              &#8226;
              {` ${item.qty} x ${item.product.nom} à ${item.product.prix} MAD`}
            </p>
          ))}
          <p>
            <small>{`Prix : ${currentOrder?.totalPrice} MAD - Livraison : ${currentOrder?.shippingPrice} MAD`}</small>
          </p>
          <small>{`type de paiement : ${currentOrder?.paymentMethod}`}</small>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default Profile;
