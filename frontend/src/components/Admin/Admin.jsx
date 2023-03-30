import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Admin.scss";

const Admin = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isAdmin = userInfo.role === "admin";
  const isSales = userInfo.role === "sales";

  return (
    <>
      <Navbar bg="light" variant="light" className="my-5 my-md-3 py-1 py-sm-2 ">
        <Nav
          variant="light"
          bg="light"
          className="my-1 flex-row flexGrow flexWrap justify-content-evenly"
        >
          <Nav.Item className="my-2 px-2" as={Link} to={`/dashboard/modify`}>
            Rajouter
          </Nav.Item>
          <Nav.Item className="my-2 px-2" as={Link} to={`/dashboard/ordres`}>
            Ordres
          </Nav.Item>
          <Nav.Item className="my-2 px-2" as={Link} to={`/dashboard/ordres`}>
            Clients
          </Nav.Item>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Admin;
