import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Table, Button } from "react-bootstrap";

import { useNavigate, useSearchParams } from "react-router-dom";
import { listOrders } from "../../actions/orderActions";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ShoppingPagination from "../ShoppingList/ShoppingPagination";
import { IoTrashOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import "./Admin.scss";
import { ORDER_LIST_SUCCESS } from "../../constants/orderConstants";

const Ordres = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
    page,
    pages,
  } = orderList;

  const currentPage = searchParams.get("page") ?? 1;
  const isAdmin = userInfo.role === "admin";
  const isSales = userInfo.role === "sales";

  const [ordermessage, setorderMessage] = useState(null);
  const [currentOrder, setcurrentOrder] = useState(null);
  const [displayOrders, setdisplayOrders] = useState(null);
  const [searchChoice, setsearchChoice] = useState("id");
  const [keyword, setKeyword] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(listOrders(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setdisplayOrders(orders);
  }, [orders]);

  const detailsHandler = (order) => {
    setcurrentOrder(order);
    handleShow();
  };

  const SetcurrentPage = (p) => {
    window.scrollTo(0, 0);
    navigate({
      pathname: `/dashboard/ordres`,
      search: `?page=${p}`,
    });
  };

  const getOrderStatus = (ord) => {
    if (ord.isDelivered) {
      return { table: "table-secondary", statut: "livré", at: ord.deliveredAt };
    }
    if (ord.isSent) {
      return { table: "table-info", statut: "envoyé", at: ord.sentAt };
    }
    if (ord.isOrdered) {
      return { table: "table-warning", statut: "commandé", at: ord.orderedAt };
    }

    return { table: "table-success", statut: "En cours", at: ord.createdAt };
  };
  const cancelOrderHandler = (ord) => {
    if (window.confirm("Voulez vous supprimer cette commande ?") == true) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios
        .post(`/api/orders/${ord._id}/delete`, {}, config)
        .then((res) => {
          dispatch(listOrders(currentPage, ord, "delete"));
        })
        .catch((err) => {
          console.log(err);
          err.response && err.response.data.message
            ? setorderMessage(err.response.data.message)
            : setorderMessage(err.message);
        });
    }
  };

  const updateOrderHandler = (currRoute) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .put(`/api/orders/${currentOrder._id}/${currRoute}`, {}, config)
      .then((res) => {
        dispatch(listOrders(currentPage, currentOrder, currRoute));
      })
      .catch((err) => {
        console.log(err);
        err.response && err.response.data.message
          ? setorderMessage(err.response.data.message)
          : setorderMessage(err.message);
      });

    handleClose();
  };

  const searchOrderHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .get(`/api/orders/${keyword}/search?select=${searchChoice}`, config)
      .then((res) => {
        dispatch({
          type: ORDER_LIST_SUCCESS,
          payload: { orders: res.data },
        });
      })
      .catch((err) => {
        console.log(err);
        err.response && err.response.data.message
          ? setorderMessage(err.response.data.message)
          : setorderMessage(err.message);
      });
  };

  return (
    <div className="mx-1 mx-md-4">
      <div className="my-4">
        <form className="form-group" onSubmit={searchOrderHandler}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="rechercher..."
              required
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              className="form-select ordresSelect form-select-sm"
              onChange={(choice) => setsearchChoice(choice.target.value)}
            >
              <option value="id">Id</option>
              <option value="email">email</option>
              <option value="phone">tel</option>
              <option value="name">nom</option>
            </select>
            <button className="btn btn-dark" type="submit">
              <i>
                <BsSearch />
              </i>
            </button>
          </div>
        </form>
        {ordermessage && <Alert variant="danger">{ordermessage}</Alert>}
        {loadingOrders ? (
          <></>
        ) : errorOrders ? (
          <Alert variant="danger">{errorOrders}</Alert>
        ) : (
          <Table bordered hover responsive className="table-sm  my-3">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>CREATION</th>
                <th>TOTAL</th>
                <th>STATUT</th>
                <th>UPDATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayOrders &&
                displayOrders.map((order) => {
                  let currValue = getOrderStatus(order);
                  return (
                    <tr key={order._id} className={`${currValue.table}`}>
                      <td>{order._id}</td>

                      <td>{`${order.createdAt.substring(
                        0,
                        10
                      )} ${order.createdAt.substring(11, 16)}`}</td>
                      <td>{order.totalPrice + order.shippingPrice} MAD</td>

                      <td>{currValue.statut}</td>
                      <td>{`${currValue.at.substring(
                        0,
                        10
                      )} ${currValue.at.substring(11, 16)}`}</td>
                      <td>
                        <Button
                          className="btn-sm btn-outline-dark px-1 py-0"
                          variant="light"
                          onClick={() => detailsHandler(order)}
                        >
                          Details
                        </Button>
                      </td>
                      {isAdmin && (
                        <td>
                          <i onClick={() => cancelOrderHandler(order)}>
                            <IoTrashOutline className="bag-item-icon" />
                          </i>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </div>
      <ShoppingPagination
        pages={Number(pages)}
        currentPage={Number(currentPage)}
        SetcurrentPage={SetcurrentPage}
      ></ShoppingPagination>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Contact :</h5>
          <p>{`Nom : ${currentOrder?.shippingUser.lastName} | Prenom : ${currentOrder?.shippingUser.firstName}`}</p>
          <p>{`Tel : ${currentOrder?.shippingUser.phone}`}</p>
          <p>{`Adresse : ${currentOrder?.shippingAddress.address} | ${currentOrder?.shippingAddress.city} | ${currentOrder?.shippingAddress.region}`}</p>
          <hr />
          <h5>Produits :</h5>
          {currentOrder?.orderItems.map((item) => (
            <p
              key={item._id}
              className="text-success"
            >{`- ${item.qty} x ${item.product.nom} à ${item.product.prix} MAD`}</p>
          ))}
          <p>
            <small>{`Prix : ${currentOrder?.totalPrice} MAD - Livraison : ${currentOrder?.shippingPrice} MAD`}</small>
          </p>
          <p>
            <small>{`type de paiement : ${currentOrder?.paymentMethod}`}</small>
          </p>
          <button
            className="btn btn-outline-success btn-sm py-1"
            onClick={() => updateOrderHandler("reset")}
          >
            Reset
          </button>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <button
            className="btn btn-warning btn-sm mx-1 "
            onClick={() => updateOrderHandler("order")}
          >
            Commander
          </button>
          <button
            className="btn btn-info btn-sm mx-1 "
            onClick={() => updateOrderHandler("send")}
          >
            Envoyer
          </button>
          <button
            className="btn btn-dark btn-sm mx-1 "
            onClick={() => updateOrderHandler("deliver")}
          >
            Livrer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Ordres;
