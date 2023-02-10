import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "./Redux/Auth/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const userlocalStorage = JSON.parse(localStorage.getItem("user"));

  const { decodeToken, isExpired, reEvaluateToken } = useJwt(
    user === null || userlocalStorage === null ? null : userlocalStorage.token
  );

  useEffect(() => {
    if (user) {
      reEvaluateToken(
        user === null || userlocalStorage === null
          ? null
          : userlocalStorage.token
      );
      if (!isExpired) {
        setAuth(!auth);
      }
    }
    if (isExpired) {
      setAuth(false);
      dispatch(logout());
      dispatch(reset());
      window.alert("Login to continue");
    }
  }, [user]);

  return isExpired ? <Navigate to="/signin" /> : <Outlet />;
};

export default PrivateRoute;
