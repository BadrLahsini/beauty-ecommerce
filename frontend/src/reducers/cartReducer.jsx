import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  WISH_ADD_ITEM,
  WISH_CLEAR_ITEMS,
  WISH_REMOVE_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product._id === item.product._id
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product
              ? (x = { product: item.product, qty: item.qty + existItem.qty })
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product._id !== action.payload
        ),
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export const wishListReducer = (state = { wishListItems: [] }, action) => {
  switch (action.type) {
    case WISH_ADD_ITEM:
      const item = action.payload;
      const existItem = state.wishListItems.find(
        (x) => x.product._id === item.product._id
      );

      if (existItem) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          wishListItems: [...state.wishListItems, item],
        };
      }
    case WISH_REMOVE_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (x) => x.product._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
