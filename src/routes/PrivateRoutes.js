import React from "react";
import Navbar from "../routes/Navbar";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectLoggedIn } from "../features/session/sessionSlice";


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
