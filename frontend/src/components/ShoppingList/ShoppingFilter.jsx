import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import "./ShoppingFilter.scss";

function ShoppingFilter({ name, subCategories, handler }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="filter-title"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <p>{name}</p>
        {open ? <p>-</p> : <p>+</p>}
      </div>
      <Collapse in={open}>
        <div className="filter-value">
          {subCategories.map((sub) => {
            return (
              <p
                key={sub}
                onClick={() => {
                  setOpen(!open);
                  handler(sub);
                }}
              >
                <small>{sub}</small>
              </p>
            );
          })}
        </div>
      </Collapse>
    </>
  );
}

export default ShoppingFilter;
