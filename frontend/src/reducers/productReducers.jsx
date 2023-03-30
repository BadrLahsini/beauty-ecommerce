import {
  CATEGORY_DETAILS_CACHE,
  CATEGORY_DETAILS_SUCCESS,
  PRODUCT_LIST_CACHE,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  CATEGORIES_ALL_SUCCESS,
  CATEGORIES_ALL_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        productUrl: action.payload.productUrl,
      };
    case PRODUCT_LIST_CACHE:
      return { ...state, loading: false };
    case CATEGORY_DETAILS_CACHE:
      return { ...state };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: action.payload.subCategories,
        marques: action.payload.marques,
        categoryDetailsUrl: action.payload.categoryDetailsUrl,
      };
    case CATEGORIES_ALL_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case CATEGORIES_ALL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
