import React from "react";
import { BsSearch } from "react-icons/bs";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import {
  IoPersonOutline,
  IoPerson,
  IoBagOutline,
  IoHeartOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoSearchOutline,
} from "react-icons/io5";
import {
  BsHandbag,
  BsHeart,
  BsPerson,
  BsList,
  BsJustify,
} from "react-icons/bs";
import Navigation from "./Navigation";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  ///////////////////////////////////////
  // Make mobile navigation work
  const [navOpen, SetNavOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const btnNavHandler = (e) => {
    // e.preventDefault();
    SetNavOpen((current) => !current);
  };

  ///////////////////////////////////////
  // Make search bar mobile work
  let ref = useRef();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const setSelectedThenCloseDropdown = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (keyword.trim()) {
      navigate({
        pathname: `/shop/resultats`,
        search: `?q=${keyword}`,
      });
    }
    isSearchOpen && setIsSearchOpen(false);
  };

  useEffect(() => {
    const handler = (event) => {
      if (isSearchOpen && ref.current && !ref.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isSearchOpen]);
  ///////////////////////////////////////

  const { cartItems } = useSelector((state) => state.cart);
  const cartLength = cartItems.length;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  return (
    <header className={`py-2 ${navOpen ? "nav-open" : ""}`}>
      <div className="sticky">
        <div className={`main-header`}>
          <div
            onClick={btnNavHandler}
            className="btnMobileNav me-0 d-md-none cursorPointer"
          >
            <IoMenuOutline
              name="menu-outline"
              className="NavIcon"
            ></IoMenuOutline>
            <IoCloseOutline
              name="close-outline"
              className="NavIcon"
            ></IoCloseOutline>
          </div>

          <div
            ref={ref}
            className="searchItem d-flex align-items-center mx-auto d-md-none cursorPointer"
          >
            <i onClick={() => setIsSearchOpen((prev) => !prev)}>
              <IoSearchOutline className="search-icon"></IoSearchOutline>
            </i>
            <div className={`searchWrapper ${isSearchOpen ? "show" : ""}`}>
              <form onSubmit={setSelectedThenCloseDropdown}>
                <input
                  type="search"
                  className="form-control form-input mobileSearch"
                  placeholder="Rechercher..."
                  onChange={(e) => setKeyword(e.target.value)}
                ></input>
              </form>
            </div>
          </div>

          <div
            className="logo-nav ms-md-3 my-md-2 mx-auto"
            onClick={() => {
              SetNavOpen(false);
            }}
          >
            <Link to="/">
              <img src="/logoround.jpg" className="img-nav" alt="" />
            </Link>
            <Link to="/">
              <h2 className="main-sequoia ms-md-2">SEQUOIA</h2>
            </Link>
          </div>

          <div className="d-none d-md-block main-search-bar  ">
            <Form onSubmit={setSelectedThenCloseDropdown}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Rechercher..."
                  className="input-border"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button variant="dark" id="button-addon2" type="submit">
                  <i>
                    <BsSearch />
                  </i>
                </Button>
              </InputGroup>
            </Form>
          </div>

          <div className="login ms-md-auto">
            <Link to="/bag">
              <div className="cart-icon-container ">
                <BsHandbag className="user-icon" />
                {cartLength ? (
                  <span className="item-count">{cartLength}</span>
                ) : (
                  <></>
                )}
              </div>
            </Link>
            <Link to="/WishList">
              <IoHeartOutline className="user-icon" />
            </Link>
            {userInfo ? (
              <Link to="/profile">
                <IoPerson className="user-icon" />
              </Link>
            ) : (
              <Link to="/login">
                <IoPersonOutline className="user-icon" />
              </Link>
            )}
          </div>
        </div>
        <Navigation handler={btnNavHandler}></Navigation>
      </div>
    </header>
  );
};

export default Header;
