import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SESH_URL = "http://localhost:3000/sessions";

const initialState = {
  loggedIn: !!window.localStorage.getItem("jwt"),
  status: "idle",
  error: null,
};

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
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

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.loggedIn = true;
      localStorage.setItem("jwt", action.payload.jwt);
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { signOut } = sessionSlice.actions;
export default sessionSlice.reducer;

export const selectStatus = (state) => state.session.status;

export const selectLoggedIn = (state) => state.session.loggedIn;
