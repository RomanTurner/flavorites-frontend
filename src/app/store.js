import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import recipesReducer from '../features/recipes/recipesSlice';
import sessionReducer from "../features/session/sessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: usersReducer,
    recipes: recipesReducer,
  },
});
