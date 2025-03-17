import React from "react";
import { Navigate, Outlet, matchPath, useLocation } from "react-router-dom";
import { URL_PATH } from "../../../config/constants/routeslinks";
import { getAuthStorage } from "../../../utils";

// const Protected = () => {
//   const { SIGNIN } = URL_PATH;
//   console.log('call')

//   const authStorage = getAuthStorage();

//   return authStorage.token ? <Outlet /> : <Navigate to={SIGNIN} />;
// };

const Protected = () => {
  const { SIGNIN, SIGNUP } = URL_PATH;
  const location = useLocation();
  const authStorage = getAuthStorage();
  const accessToken = authStorage.token;
  // const roles = ["admin","guest","speaker","user"];
  // const isAllowedRole = roles.includes(user?.role) ? true : false;
  const publicRoutes = ["/", SIGNIN, SIGNUP];
  const protectedRoutes = ['/admin/:path*', '/user/:path*'];
  const isProtectedRoute = protectedRoutes.some((route) =>matchPath(route, location.pathname));
  const isPublicRoute = publicRoutes.some((route) =>matchPath(route, location.pathname));

  
  if ((accessToken && isProtectedRoute) || (!accessToken && isPublicRoute)) {
    return <Outlet />;
  } 
  else if (!accessToken && isProtectedRoute) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (accessToken && isPublicRoute) {
    return <Navigate to={`/admin/dashboard`} replace />;
  } else {
    return <Outlet />;
  }
};

export default Protected;
