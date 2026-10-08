import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();

  // Change "token" if your login stores the JWT under another name
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
