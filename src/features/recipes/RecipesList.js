import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllRecipes, fetchRecipes } from "./recipesSlice";
import RecipeExcerpt from "./RecipeExcerpt";

const RecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  const offset = useSelector((state) => state.recipes.offset);
  const count = useSelector((state) => state.recipes.count);
  const limit = useSelector((state) => state.recipes.limit);


  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes({limit, offset}));
    }
  }, [recipesStatus, dispatch]);

  let content;
  if (recipesStatus === "loading") {
    content = <div> Loading...</div>;
  } else if (recipesStatus === "succeeded") {
    content = recipes.map((recipe) => (
      <RecipeExcerpt key={recipe.id} {...recipe} />
    )); 
  } else if (recipesStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className='posts-list'>
      <h2>Recipes</h2>
      {content}
    </section>
  );
};

export default RecipesList;
