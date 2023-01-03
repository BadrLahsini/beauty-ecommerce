import { Nav, Navbar } from "react-bootstrap";
import Category from "./Category";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Navigation({ handler }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`/api/products`).then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      className="main-nav py-1 py-sm-2 "
    >
      <Nav
        variant="dark"
        bg="dark"
        className="ms-3 flex-column flex-md-row flexGrow flexWrap justify-content-evenly dropdown-center"
      >
        {categories.map((cat) => (
          <Category key={cat.nom} category={cat} handler={handler}></Category>
        ))}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
