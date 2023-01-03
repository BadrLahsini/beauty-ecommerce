import { useState, useEffect } from "react";
import axios from "axios";

import "./Login.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userActions";
import { Alert } from "react-bootstrap";

import MoonLoader from "react-spinners/MoonLoader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location?.state?.redirect ?? "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: registerLoading,
    error: registerError,
    userRegisterInfo,
  } = userRegister;

  // var confirm_password = document.getElementById("confirm_password");

  const loginCallBack = (e) => {
    e.preventDefault();
    console.log("login success");
    dispatch(login(email, password));
  };

  const signupCallBack = (e) => {
    console.log("signup");

    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("signup error");
    } else {
      dispatch(register(name, lastName, email, password, phone));
      console.log("login success");
    }
  };

  const confirmPasswordHandler = (e) => {
    if (password !== e.target.value) {
      e.target.setCustomValidity("mots de passe differents !");
    } else {
      setConfirmPassword(e.target.value);

      e.target.setCustomValidity("");
    }
  };

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const resetPasswordHandler = () => {
    if (!validEmail.test(email)) {
      setMessage("veuillez entrer un email valide");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/api/users/resetPassword", { email }, config)
      .then((res) => {
        console.log(res);
        navigate(
          { pathname: `/message/success` },
          { state: { message: res.data.message } }
        );
      })
      .catch((err) => {
        console.log(err);
        err.response && err.response.data.message
          ? setMessage(err.response.data.message)
          : setMessage(err.message);
      });
  };

  useEffect(() => {
    if (userInfo) {
      navigate({
        pathname: `${redirect}`,
      });
    }
  }, [userInfo, redirect]);

  useEffect(() => {
    if (userRegisterInfo?.message) {
      navigate(
        { pathname: `/message/success` },
        { state: { message: userRegisterInfo.message } }
      );
    }
  }, [userRegisterInfo, redirect]);

  return (
    <div className="login-container">
      <img className="signup-img" src="/images/signup-image.jpg" alt="signup" />
      <div className="main-container">
        <ul className="nav nav-tabs nav-justified mb-3">
          <li
            className="nav-item cursorPointer"
            onClick={() => {
              !isLogin && setIsLogin(true);
            }}
          >
            <a className={`nav-link ${isLogin ? ` active` : ``}`}>
              Se connecter
            </a>
          </li>
          <li
            className="nav-item cursorPointer"
            onClick={() => {
              isLogin && setIsLogin(false);
            }}
          >
            <a className={`nav-link ${isLogin ? `` : ` active`}`}>
              S'enregistrer
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className={`tab-pane fade ${isLogin ? `show active` : ``}`}>
            {error ? <Alert variant="danger">{error}</Alert> : <></>}
            {message ? <Alert variant="warning">{message}</Alert> : <></>}
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
            ) : (
              <form onSubmit={loginCallBack}>
                <div className="form-outline mb-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    id="loginName"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    minLength="4"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-12 d-flex justify-content-center">
                    <a
                      className="cursorPointer text-decoration-underline"
                      onClick={resetPasswordHandler}
                    >
                      Mot de passe oublié?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-block mb-4 "
                >
                  Se Connecter
                </button>

                <div className="text-center ">
                  <p
                    className="cursorPointer"
                    onClick={() => {
                      setIsLogin(false);
                    }}
                  >
                    Pas encore de compte?{" "}
                    <a className="text-decoration-underline">S'enregistrer</a>
                  </p>
                </div>
              </form>
            )}
          </div>
          <div className={`tab-pane fade ${isLogin ? `` : `show active`}`}>
            {registerError ? (
              <Alert variant="danger">{registerError}</Alert>
            ) : (
              <></>
            )}

            {registerLoading ? (
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
            ) : (
              <form onSubmit={(e) => signupCallBack(e)}>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">Prenom</label>
                      <input
                        minLength="3"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Nom</label>
                    <div className="form-outline">
                      <input
                        minLength="3"
                        type="text"
                        className="form-control"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Telephone</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    minLength="6"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Répéter le mot de passe</label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="form-control"
                    onKeyUp={confirmPasswordHandler}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-block mb-3"
                >
                  S'enregistrer
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
