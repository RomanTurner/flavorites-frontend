import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const PLANS_URL = "http://localhost:3000/meal_plans/";

const initialState = {
  plans: [],
  status: "idle",
  error: null,
};


//Get all plans
export const fetchPlans = createAsyncThunk("plans/fetchPlans", async () => {
  const configObj = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `bearer ${localStorage.getItem("jwt")}`,
    },
  };
  const response = await fetch(PLANS_URL, configObj);
  return response.json();
});


export const plansSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    revertStatus: (state) => void (state.planStatus = "idle"),
  },
  extraReducers: {
    [fetchPlans.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPlans.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.plans = state.plans.concat(action.payload);
    },
    [fetchPlans.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  },
});

export default plansSlice.reducer;

export const selectAllPlans = (state) => state.plans.plans;

export const selectPlanById = (state, pId) => {
  return state.plans.plans.find((plan) => plan.id === pId);
};
