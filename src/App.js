import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { selectLoggedIn } from "./features/session/sessionSlice";
import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRoutes";
import Login from "./routes/Login";
import RecipesIndex from "./features/recipes/RecipeIndex";
import RecipeShow from "./features/recipes/RecipeShow";
import PlansIndex from "./features/plans/PlansIndex";
import PlanShow from "./features/plans/PlanShow";
import NotFoundPage from "./routes/NotFoundPage";
import Dashboard from "./features/session/Dashboard";

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

const routes = [
  {
    path: "/meal_plans/:id",
    component: PlanShow,
  },
  {
    path: "/meal_plans",
    component: PlansIndex,
  },
  {
    path: "/recipes/:id",
    component: RecipeShow,
  },
  {
    path: "/recipes",
    component: RecipesIndex,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
