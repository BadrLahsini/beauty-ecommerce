import { Nav, Navbar } from "react-bootstrap";
import Category from "./Category";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllCategories } from "../../actions/productActions";

function Navigation({ handler }) {
  const [categories, setCategories] = useState([]);
  const { categories: allcategories } = useSelector(
    (state) => state.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatching navigation");
    dispatch(listAllCategories());
  }, []);

  useEffect(() => {
    allcategories && setCategories(allcategories);
    console.log(allcategories);
  }, [allcategories]);

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
        {categories &&
          categories.map((cat) => (
            <Category key={cat.nom} category={cat} handler={handler}></Category>
          ))}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
