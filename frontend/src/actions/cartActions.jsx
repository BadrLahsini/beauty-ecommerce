import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  WISH_ADD_ITEM,
  WISH_CLEAR_ITEMS,
  WISH_REMOVE_ITEM,
} from "../constants/cartConstants";

export const addToCart = (product, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
    payload: {},
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addToWishList = (product) => (dispatch, getState) => {
  dispatch({
    type: WISH_ADD_ITEM,
    payload: {
      product,
    },
  });

  localStorage.setItem(
    "wishListItems",
    JSON.stringify(getState().wishList.wishListItems)
  );
};

export const removeFromWishList = (id) => (dispatch, getState) => {
  dispatch({
    type: WISH_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "wishListItems",
    JSON.stringify(getState().wishList.wishListItems)
  );
};
