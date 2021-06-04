import { createSlice, current } from "@reduxjs/toolkit";
import {
  createMealPlan,
  getCurrentUsersPlans,
  addRecipeToPlan,
  deletePlan,
  deleteRecipeFromMealPlan,
  updatePlan,
} from "./planFetches";

const initialState = {
  plans: [],
  status: "idle",
  addRecipeToMealPlanStatus: "idle",
  deleteMealPlanStatus: "idle",
  createMealPlanStatus: "idle",
  updatePlanStatus: "idle",
  deleteRecipeStatus: "idle",
  error: null,
};

export const userPlansSlice = createSlice({
  name: "userPlans",
  initialState,
  reducers: {},
  extraReducers: {
    //Creates a New Meal Plan
    [createMealPlan.pending]: (state) => {
      state.createMealPlanStatus = "loading";
    },
    [createMealPlan.fulfilled]: (state, action) => {
      state.createMealPlanStatus = "succeeded";
      state.plans = [action.payload, ...state.plans]
    },
    [createMealPlan.rejected]: (state, action) => {
      state.createMealPlanStatus = "failed";
      state.error = action.error.message;
    },
    //Fetches the plans for the current User
    [getCurrentUsersPlans.pending]: (state) => {
      state.status = "loading";
    },
    [getCurrentUsersPlans.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.plans = action.payload.meal_plans;
    },
    [getCurrentUsersPlans.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //Add a Recipe to a Meal Plan
    [addRecipeToPlan.pending]: (state, action) => {
      state.addRecipeToMealPlanStatus = "loading";
    },
    [addRecipeToPlan.fulfilled]: (state, action) => {
      state.addRecipeToMealPlanStatus = "succeeded";
      state.plans = state.plans.filter((plan) => plan.id !== action.payload.id);
      state.plans.push(action.payload);
    },
    [addRecipeToPlan.rejected]: (state, action) => {
      state.addRecipeToMealPlanStatus = "failed";
      state.error = action.error.message;
    },
    //todo: get rid of?
    //Deletes Recipe from a Meal Plan
    [deleteRecipeFromMealPlan.pending]: (state, action) => {
      state.deleteRecipeStatus = "loading";
    },
    [deleteRecipeFromMealPlan.fulfilled]: (state, action) => {
      //find the meal plan that we need to change
      const targetedPlan = state.plans.find(
        (plan) => plan.id === +action.payload.mealPlan
      );
      //filter the meal plans of that plan we want to change
      const filteredPlans = state.plans.filter(
        (plan) => plan.id !== +action.payload.mealPlan
      );
      //find the recipe we want to delete
      const filteredRecipes = targetedPlan.meal_plan_recipes.filter(
        (recipe) => recipe.id !== action.payload.recipeId
      );
      console.log(current(state));
      targetedPlan.meal_plan_recipes = filteredRecipes;

      state.plans = [...filteredPlans, targetedPlan];
    },
    [deleteRecipeFromMealPlan.rejected]: (state, action) => {
      state.deleteRecipeStatus = "failed";
      state.error = action.error.message;
    },
    //Delete Meal Plan
    [deletePlan.pending]: (state) => {
      state.deleteMealPlanStatus = "loading";
    },
    [deletePlan.fulfilled]: (state, action) => {
      state.deleteMealPlanStatus = "idle";
      state.plans = state.plans.filter((plan) => plan.id !== action.payload);
    },
    [deletePlan.rejected]: (state, action) => {
      state.deleteMealPlanStatus = "failed";
      state.error = action.error.message;
    },
    //Update Meal Plan
    [updatePlan.pending]: (state) => {
      state.updatePlanStatus = "loading";
    },
    [updatePlan.fulfilled]: (state, action) => {
      state.updatePlanStatus = "Success";
      const newPlans = state.plans.filter((plan) => plan.id !== action.payload.id)
      state.plans = [...newPlans, action.payload]
    },
    [updatePlan.rejected]: (state, action) => {
      state.updatePlanStatus = "failed";
      state.error = action.error.message;
    },
  },
});

export default userPlansSlice.reducer;

export const { revertStatus } = userPlansSlice.actions;

export const selectAllPlans = (state) => state.plans.plans;

export const selectPlanById = (state, pId) => {
 return state.userPlans.plans.find((plan) => plan.id === pId);
};

export const selectAndMapPlan = (state, pId) => {
  let plan = state.userPlans.plans.find((plan) => plan.id === pId);
  return plan?.meal_plan_recipes.reduce(
    (acc, target) => ({
      ...acc,
      [target.mprid]: {
        id: target.mprid,
        title: target.title,
        main_img: target.main_img,
      },
    }),
    []
  );
};


