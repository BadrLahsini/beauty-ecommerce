import React from "react";
import WishItem from "./WishItem/WishItem";
import "../Cart/Cart.scss";
import { useSelector } from "react-redux";

const Wish = () => {
  const { wishListItems } = useSelector((state) => state.wishList);

  return (
    <section className="bag-container">
      <div className="checkout-validate mx-3 my-4">
        <h2>Ma WishList</h2>
      </div>

      {wishListItems.map((item) => (
        <div key={item.product._id}>
          <hr className="hr mx-3" />
          <WishItem item={item.product}></WishItem>
        </div>
      ))}
      <hr className="hr mx-3" />
    </section>
  );
};

export default Wish;
