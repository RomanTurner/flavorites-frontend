import { createAsyncThunk } from "@reduxjs/toolkit";

const PLANS_URL = "http://localhost:3000/meal_plans/";
const MP_RECIPES_URL = "http://localhost:3000/meal_plan_recipes/";
const SESH_URL = "http://localhost:3000/sessions/";

// Fetches a paginated amount of meal plans
export const createMealPlan = createAsyncThunk(
  "session/createMealPlan",
  async (body) => {
    const configObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(PLANS_URL, configObj);
    return response.json();
  }
);

//Fetches current session user's meal plans
export const getCurrentUsersPlans = createAsyncThunk(
  "userPlans/getCurrentUsersPlans",
  async () => {
    const configObj = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const response = await fetch(SESH_URL, configObj);
    return response.json();
  }
);

//Add Recipe to current user Meal Plan
export const addRecipeToPlan = createAsyncThunk(
  "userPlans/addRecipeToPlan",
  async (body) => {
    const configObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(MP_RECIPES_URL, configObj);
    return response.json();
  }
);

//Update to current user Meal Plan
export const updatePlan = createAsyncThunk(
  "userPlans/updatePlan",
  async ({body, id}) => {
    const configObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(body),
    };
    
    const response = await fetch(PLANS_URL + id , configObj);
    return response.json();
  }
);


//Delete plan
export const deletePlan = createAsyncThunk("userPlans/deletePlans", async (id) => {
  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${localStorage.getItem("jwt")}`,
    },
  };
  await fetch(PLANS_URL + id, configObj);
  return id;
});

//Delete recipe from plan
export const deleteRecipeFromMealPlan = createAsyncThunk(
  "userPlans/deleteRecipeFromMealPlan",
  async (body) => {
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    };
    await fetch(
      `${MP_RECIPES_URL}1?meal_plan_id=${body.mealPlan}&recipe_id=${body.recipeId}`,
      configObj
    );
    return body;
  }
);
