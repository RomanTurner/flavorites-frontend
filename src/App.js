import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { selectLoggedIn } from "./features/session/sessionSlice";
import { useSelector } from "react-redux";
import { routes } from "./routes/routes"
import PrivateRoute from "./routes/PrivateRoutes";
import Login from "./routes/Login";

export default function App() {
  const location = useLocation();
  const loggedIn = useSelector(selectLoggedIn);

  const path = location.pathname.split("/")[1];
  const pastPath = sessionStorage.getItem("current");
  sessionStorage.setItem("current", path);
  sessionStorage.setItem("history", pastPath);
 
  //clears
  const loggingOut = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div>
   
      {loggedIn ? (
        <button onClick={() => loggingOut()}>Sign Out</button>
      ) : (
        "You are not logged in"
      )}
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
          {routes.map((route) => {
            return (
              <PrivateRoute key={route.path} path={route.path}>
                <route.component />
              </PrivateRoute>
            );
          })}
      </Switch>
    </div>
  );
}


