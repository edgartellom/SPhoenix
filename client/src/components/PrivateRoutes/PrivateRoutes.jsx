import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ admin }) => {
  let auth = { admin: false };

  return auth.admin ? <Outlet /> : <Navigate to="/" />;
  //   let admin = true;

  //   if (admin === false) {
  //     return <Navigate to="/" />;
  //   }
  //   return <Outlet />;
};

export default PrivateRoutes;
