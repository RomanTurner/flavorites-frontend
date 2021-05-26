import React from "react";
import {
  Route,
  Link,
  Switch
} from "react-router-dom";
import { selectLoggedIn } from "./features/session/sessionSlice"
import { useSelector } from "react-redux"
import PrivateRoute from "./routes/PrivateRoutes"
import Login from "./routes/Login"
import RecipesList from "./features/recipes/RecipesList";
import RecipePage from "./features/recipes/RecipePage";
import NotFoundPage from "./routes/NotFoundPage";


const Dashboard = () => {
  return <h3>Public</h3>;
};

export default function App() {
  const loggedIn = useSelector(selectLoggedIn);
  //clears
  const loggingOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <ul>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/recipes'>Recipes</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
      <Switch>

        <Route path='/login'>
          <Login />
        </Route>

        <PrivateRoute exact path='/recipes/:id'>
          <RecipePage />
        </PrivateRoute>

        <PrivateRoute exact path='/recipes'>
          <RecipesList />
        </PrivateRoute>

        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute exact path='/dashboard'>
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute path='*'>
          <NotFoundPage />
        </PrivateRoute>

      </Switch>
      {loggedIn ? (
        <button onClick={() => loggingOut()}>Sign Out</button>
      ) : (
        "You are not logged in"
      )}
    </div>
  );
}
