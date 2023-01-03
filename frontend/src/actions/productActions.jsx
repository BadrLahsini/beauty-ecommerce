import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  CATEGORY_DETAILS_SUCCESS,
  PRODUCT_LIST_CACHE,
  CATEGORY_DETAILS_CACHE,
} from "../constants/productConstants";

import axios from "axios";

export const listProducts =
  (
    category,
    isSubCategory,
    keyword = "",
    pageNumber = 1,
    sort = "",
    marque = "",
    productUrl = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      var url = isSubCategory
        ? `/api/products/subcategory/${category}?keyword=${keyword}&page=${pageNumber}&sort=${sort}&marque=${marque}`
        : `/api/products/category/${category}?keyword=${keyword}&page=${pageNumber}&sort=${sort}&marque=${marque}`;
      console.log(url);

      if (url == productUrl) {
        dispatch({
          type: PRODUCT_LIST_CACHE,
          payload: {},
        });
      } else {
        const { data } = await axios.get(url);

        dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: { ...data, productUrl: url },
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: PRODUCT_LIST_FAIL, payload: e });
    }
  };

//////// FIRST CALL TO CATEGORIES /////////////
export const listCategoryDetails =
  (category, isSubCategory, keyword = "", categoryDetailsUrl = "") =>
  async (dispatch) => {
    try {
      var url = isSubCategory
        ? `/api/products/categorydetails/${category}?keyword=${keyword}&isSub=${isSubCategory}`
        : `/api/products/categorydetails/${category}?keyword=${keyword}`;
      console.log(url);
      if (url == categoryDetailsUrl) {
        dispatch({
          type: CATEGORY_DETAILS_CACHE,
          payload: {},
        });
      } else {
        const { data } = await axios.get(url);
        dispatch({
          type: CATEGORY_DETAILS_SUCCESS,
          payload: { ...data, categoryDetailsUrl: url },
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: PRODUCT_LIST_FAIL, payload: e });
    }
  };
