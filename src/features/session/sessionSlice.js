import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SESH_URL = "http://localhost:3000/sessions/";

const initialState = {
  user: {},
  followers: [],
  following: [],
  loggedIn: !!window.localStorage.getItem("jwt"),
  status: "idle",
  error: null,
};

//Handles Login
export const fetchLogin = createAsyncThunk(
  "session/fetchLogin",
  async ({ username, password }) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, password } }),
    };
    const response = await fetch(SESH_URL, configObj);
    return response.json();
  }
);

export const fetchSession = createAsyncThunk("session/fetchSession", async () => {
  const configObj = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${localStorage.getItem("jwt")}`,
    },
  };
  const response = await fetch(SESH_URL, configObj);
  return response.json();
});
// const addItemToArray = (state, action) => {
//   state.push(action.payload);
// };
// const removeItemToArray = (state, action) => {
//   state.filter(action.payload);
// };
 
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addRecipeToPlan(state, action) {
      state.mealPlans.push(action.payload);
    },
    addFollower(state, action) {
      state.followers.push(action.payload);
    },
    signOut(state) {
      state.session.loggedIn = false;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loggedIn = true;
      localStorage.setItem("jwt", action.payload.jwt);
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchSession.pending]: (state) => {
      state.planStatus = "loading";
    },
    [fetchSession.fulfilled]: (state, action) => {
      state.planStatus = "succeeded";
      state.user = {
        username: action.payload.username,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        bio: action.payload.bio,
      };
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },
    [fetchSession.rejected]: (state, action) => {
      state.planStatus = "failed";
      state.error = action.error.message;
    },
  },
}); 



export const { signOut } = sessionSlice.actions;

export default sessionSlice.reducer;

export const selectStatus = (state) => state.session.status;

export const selectLoggedIn = (state) => state.session.loggedIn;
