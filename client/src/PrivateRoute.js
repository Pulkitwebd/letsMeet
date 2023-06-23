import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../src/Redux/Auth/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { isExpired, reEvaluateToken } = useJwt(user ? user.token : null);

  useEffect(() => {
    if (user) {
      reEvaluateToken(user.token || null);
    } else {
      dispatch(logout());
    }
  }, [user]);

  return isExpired ? <Navigate to="/signin" /> : <Outlet />;
};

export default PrivateRoute;
