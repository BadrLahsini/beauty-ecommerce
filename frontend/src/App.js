import "./App.scss";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import Product from "./components/Product/Product";

// const ShoppingList = React.lazy(() =>
//   import("./components/ShoppingList/ShoppingList")
// );
// const Product = React.lazy(() => import("./components/Product/Product"));
const Cart = React.lazy(() => import("./components/Cart/Cart"));
const Wish = React.lazy(() => import("./components/WishList/Wish"));

const Home = React.lazy(() => import("./components/Home/Home"));

const Shipping = React.lazy(() => import("./components/Shipping/Shipping"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Validation = React.lazy(() => import("./components/Login/Validation"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Message = React.lazy(() => import("./components/Message/Message"));

function App() {
  return (
    <>
      <Header></Header>
      <Suspense
        fallback={
          <div>
            <MoonLoader
              cssOverride={{
                margin: "20rem auto",
              }}
              size={100}
              color="#246001"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        }
      >
        <Routes>
          <Route index element={<Home />} />

          <Route
            path="/shop/:category"
            element={
              <>
                <ShoppingList />
              </>
            }
          />

          <Route
            path="/message/:variant"
            element={
              <>
                <Message />
              </>
            }
          />

          <Route
            path="/shipping"
            element={
              <ScrollToTop>
                <Shipping />
              </ScrollToTop>
            }
          />

          <Route
            path="/login"
            element={
              <ScrollToTop>
                <Login />
              </ScrollToTop>
            }
          />

          <Route
            path="/validation/:code"
            element={
              <ScrollToTop>
                <Validation />
              </ScrollToTop>
            }
          />

          <Route
            path="/profile"
            element={
              <ScrollToTop>
                <Profile />
              </ScrollToTop>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ScrollToTop>
                <Product />
              </ScrollToTop>
            }
          />

          <Route
            path="/bag"
            element={
              <ScrollToTop>
                <Cart />
              </ScrollToTop>
            }
          />

          <Route
            path="/WishList"
            element={
              <ScrollToTop>
                <Wish />
              </ScrollToTop>
            }
          />
        </Routes>
      </Suspense>
      <Footer></Footer>
    </>
  );
}

export default App;
