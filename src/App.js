import React from "react";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import { routes } from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoutes";
import { Route, Switch, useLocation } from "react-router-dom";


export default function App() {
  const location = useLocation();
  
  //creates a permanent token for us to use on refresh/ etc
  const path = location.pathname.split("/")[1];
  const pastPath = sessionStorage.getItem("current");
  sessionStorage.setItem("current", path);
  sessionStorage.setItem("history", pastPath);

  return (
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
          {routes.map((route) => {
            return (
              <PrivateRoute key={route.path} path={route.path}>
                <route.component />
              </PrivateRoute>
            );
          })}
      </Switch>
  );
}


