import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../features/session/sessionSlice";
import Navbar from "../routes/Navbar"
function PrivateRoutes({ children, ...rest }) {
  const loggedIn = useSelector(selectLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return loggedIn ? (
          <Navbar>
            {children}
          </Navbar>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}


  
export default PrivateRoutes;
