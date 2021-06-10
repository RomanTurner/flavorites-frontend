import { createSlice } from "@reduxjs/toolkit";

//const USER_URL = "http://localhost:3000/users";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {

  },
});
export default usersSlice.reducer