import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Category = ({ category, handler }) => {
  return (
    <NavDropdown
      key={category.nom}
      title={category.nom.toUpperCase()}
      id="basic-nav-dropdown"
      renderMenuOnMount={true}
    >
      <NavDropdown.Item
        as={Link}
        to={`/shop/${category.nom}`}
        onClick={handler}
      >
        {category.nom.toUpperCase()}
      </NavDropdown.Item>

      <NavDropdown.Divider />
      {category.subCategories.map((sub) => {
        return (
          <NavDropdown.Item
            onClick={handler}
            key={sub}
            as={Link}
            to={{
              pathname: `/shop/${sub}`,
              search: "?sub=true",
            }}
          >
            {sub}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
};

export default Category;
