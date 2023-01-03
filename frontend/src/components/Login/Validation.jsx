import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirmUser } from "../../actions/userActions";

const Validation = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (code) {
      dispatch(confirmUser(code));
    }
  }, [code]);
  useEffect(() => {
    if (userInfo) {
      navigate(
        { pathname: `/message/success` },
        {
          state: {
            message: "Bienvenue, votre compte a ete valide avec succes",
          },
        }
      );
    }
  }, [userInfo]);

  return (
    <>
      <p>{error}</p>
    </>
  );
};

export default Validation;
