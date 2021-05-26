import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const url = "http://localhost:3000/recipes"

const initialState = {
  recipes: [],
  status: "idle",
  error: null,
  counter: localStorage.getItem("counter") || 0,
  limit: 24,
  offset: localStorage.getItem("offset") || 0,
};

/*
fetchRecipes 
limit is the amount of recipes we get from the database per page.
offset is where we start our fetch in the database relative to the limit. 
counter is what determines the offset. It is increased or decreased with the next or prev buttons. 
Returns a paginated array of recipes. 
*/

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async({limit, offset}) => {
        const configObj = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('jwt')}`
            }
        }
    
    const paginatedUrl = `${url}/?limit=${limit}&offset=${offset}`
    const response = await fetch(paginatedUrl, configObj);
    return response.json()
    }
)

export const fetchRecipe = createAsyncThunk(
  "recipes/fetchRecipe",
  async ({ id }) => {
    const configObj = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${localStorage.getItem("jwt")}`,
      },
    };

    const recipeURL = `${url}/${id}`;
    const response = await fetch(recipeURL, configObj);
    return response.json();
  }
);
export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRecipes.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRecipes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.recipes = state.recipes.concat(action.payload.recipes)
    },
    [fetchRecipes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchRecipe.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRecipe.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.recipe = action.payload
    },
    [fetchRecipe.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default recipesSlice.reducer;

export const selectAllRecipes = state => state.recipes.recipes;
export const selectRecipeById = (state, rId) => {
  state.recipes.recipes.find((recipe) => recipe.id === rId)
};