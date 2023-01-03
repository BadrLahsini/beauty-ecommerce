import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./ShoppingList.scss";
import Item from "../Item/Item";
import MoonLoader from "react-spinners/MoonLoader";
import Message from "../Message/Message";
import {
  listCategoryDetails,
  listProducts,
} from "../../actions/productActions";
import ShoppingFilter from "./ShoppingFilter";
import "./ShoppingFilter.scss";
import ShoppingPagination from "./ShoppingPagination";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const isSub = searchParams.get("sub") == "true" ? true : false;
  const keyword = searchParams.get("q") ?? "";
  const currentPage = searchParams.get("page") ?? 1;
  const currsort = searchParams.get("sort") ?? "";
  const currMarque = searchParams.get("marque") ?? "";

  const {
    loading,
    error,
    products,
    page,
    pages,
    marques,
    subCategories,
    productUrl,
    categoryDetailsUrl,
  } = useSelector((state) => state.productList);
  const SetcurrentPage = (p) => {
    window.scrollTo(0, 0);
    navigate({
      pathname: `/shop/${category}`,
      search: `?q=${keyword}&page=${p}&sort=${currsort}&marque=${currMarque}&sub=${isSub}`,
    });
  };

  const resetFilter = () => {
    navigate({
      pathname: `/shop/${category}`,
      search: `?q=${keyword}&sub=${isSub}`,
    });
  };

  useEffect(() => {
    dispatch(
      listProducts(
        category,
        isSub,
        keyword,
        currentPage,
        currsort,
        currMarque,
        productUrl
      )
    );
  }, [currentPage, currsort, currMarque]);

  useEffect(() => {
    dispatch(listCategoryDetails(category, isSub, keyword, categoryDetailsUrl));
    dispatch(
      listProducts(
        category,
        isSub,
        keyword,
        currentPage,
        currsort,
        currMarque,
        productUrl
      )
    );
  }, [category, keyword]);

  const preoccupations = [];

  ////////// HANDLERS ////////

  const marqueHandler = (val) => {
    navigate({
      pathname: `/shop/${category}`,
      search: `?q=${keyword}&page=${1}&sort=${currsort}&marque=${val}&sub=${isSub}`,
    });
  };

  const categoryHandler = (val) => {
    navigate({
      pathname: `/shop/${val}`,
      search: "?sub=true",
    });
  };

  const filterHandler = (val) => {
    switch (val) {
      case "A a Z":
        navigate({
          pathname: `/shop/${category}`,
          search: `?q=${keyword}&page=${1}&sort=nom&marque=${currMarque}&sub=${isSub}`,
        });
        break;
      case "Z a A":
        navigate({
          pathname: `/shop/${category}`,
          search: `?q=${keyword}&page=${1}&sort=nomdesc&marque=${currMarque}&sub=${isSub}`,
        });
        break;
      case "prix croissant":
        navigate({
          pathname: `/shop/${category}`,
          search: `?q=${keyword}&page=${1}&sort=prix&marque=${currMarque}&sub=${isSub}`,
        });
        break;
      case "prix decroissant":
        navigate({
          pathname: `/shop/${category}`,
          search: `?q=${keyword}&page=${1}&sort=prixdesc&marque=${currMarque}&sub=${isSub}`,
        });
        break;
      default:
    }
  };

  ////// PAGINATION ////////

  return (
    <>
      <section>
        <div className="shopping-header">
          <div>
            <img
              src="/logo.png"
              className="shopping-title-image"
              alt="PICTURE"
            />
          </div>
          <div>
            <h1>{category}</h1>
          </div>
        </div>
        {loading ? (
          <div className="mx-5 my-5">
            <MoonLoader
              cssOverride={{
                display: "block",
                margin: "0 auto",
                borderColor: "red",
              }}
              size={150}
              color="#246001"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <hr />

            <div className="shopping-container">
              <div className="filter-container">
                {!isSub && subCategories && (
                  <ShoppingFilter
                    name="CATÉGORIES"
                    subCategories={subCategories}
                    handler={categoryHandler}
                  ></ShoppingFilter>
                )}

                <ShoppingFilter
                  name="PRÉOCCUPATIONS"
                  subCategories={preoccupations}
                ></ShoppingFilter>
                <ShoppingFilter
                  name="TRIER"
                  subCategories={[
                    "A a Z",
                    "Z a A",
                    "prix croissant",
                    "prix decroissant",
                  ]}
                  handler={filterHandler}
                ></ShoppingFilter>

                {marques && (
                  <ShoppingFilter
                    name="MARQUES"
                    subCategories={marques}
                    handler={marqueHandler}
                  ></ShoppingFilter>
                )}
                <button
                  type="button"
                  onClick={resetFilter}
                  className="btn btn-outline-dark btn-sm "
                >
                  RESET
                </button>
                <hr />
              </div>

              <div className="main-shopping-list">
                {products &&
                  products.map((item) => (
                    <Item key={item._id} item={item}></Item>
                  ))}
              </div>
            </div>
            <ShoppingPagination
              pages={Number(pages)}
              currentPage={Number(currentPage)}
              SetcurrentPage={SetcurrentPage}
            ></ShoppingPagination>
          </>
        )}
      </section>
    </>
  );
};

export default ShoppingList;
