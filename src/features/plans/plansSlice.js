import { createSlice} from "@reduxjs/toolkit";
import {
  createMealPlan,
  getCurrentUsersPlans,
  addRecipeToPlan,
  fetchPlans,
  deletePlan,
  deleteRecipeFromMealPlan,
} from "./planFetches";

const initialState = {
  plans: [],
  sessionPlans: [],
  status: "idle",
  addStatus: "idle",
  planStatus: "idle",
  createStatus: "idle",
  deleteStatus: "idle",
  deleteRecipeStatus: "idle",
  error: null,
};

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
    },
    //Creates a New Meal Plan
    [createMealPlan.pending]: (state) => {
      state.createStatus = "loading";
    },
    [createMealPlan.fulfilled]: (state, action) => {
      state.createStatus = "succeeded";
      state.sessionPlans.push(action.payload);
      state.plans.push(action.payload);
    },
    [createMealPlan.rejected]: (state, action) => {
      state.createStatus = "failed";
      state.error = action.error.message;
    },
    //Fetches the plans for the current User
    [getCurrentUsersPlans.pending]: (state) => {
      state.planStatus = "loading";
    },
    [getCurrentUsersPlans.fulfilled]: (state, action) => {
      state.planStatus = "succeeded";
      state.sessionPlans = action.payload.meal_plans;
    },
    [getCurrentUsersPlans.rejected]: (state, action) => {
      state.planStatus = "failed";
      state.error = action.error.message;
    },
    //Add a Recipe to a Meal Plan
    [addRecipeToPlan.pending]: (state, action) => {
      state.addStatus = "loading";
    },
    [addRecipeToPlan.fulfilled]: (state, action) => {
      state.addStatus = "succeeded";
      const newPlan = state.plans.find(
        (plan) => plan.id === action.payload.meal_plan
      );
      newPlan.recipes.push(action.payload.recipe);
    },
    [addRecipeToPlan.rejected]: (state, action) => {
      state.addStatus = "failed";
      state.error = action.error.message;
    },
    //Deletes Recipe from a Meal Plan
    [deleteRecipeFromMealPlan.pending]: (state, action) => {
      state.deleteRecipeStatus = "loading";
    },
    [deleteRecipeFromMealPlan.fulfilled]: (state, action) => {
      const targetedPlan = state.plans.find(plan => plan.id === +action.payload.mealPlan)
      const filteredPlans = state.plans.filter(plan => plan.id !== +action.payload.mealPlan)
      const filteredTargetRecipes = targetedPlan.recipes.filter(recipe=>recipe.id !== action.payload.recipeId)
      targetedPlan.recipes = filteredTargetRecipes;
      state.plans = [...filteredPlans, targetedPlan]
    },
    [deleteRecipeFromMealPlan.rejected]: (state, action) => {
      state.deleteRecipeStatus = "failed";
      state.error = action.error.message;
    },
    //Delete Meal Plan
    [deletePlan.pending]: (state) => {
      state.deleteStatus = "loading";
    },
    [deletePlan.fulfilled]: (state, action) => {
      state.deleteStatus = "idle";
      state.sessionPlans = state.sessionPlans.filter(
        (plan) => plan.id !== action.payload
      );
      state.plans = state.plans.filter((plan) => plan.id !== action.payload);
    },
    [deletePlan.rejected]: (state, action) => {
      state.deleteStatus = "failed";
      state.error = action.error.message;
    },
  },
});

export default plansSlice.reducer;

export const { revertStatus } = plansSlice.actions;

export const selectAllPlans = (state) => state.plans.plans;

export const selectPlanById = (state, pId) => {
  return state.plans.plans.find((plan) => plan.id === pId);
};
