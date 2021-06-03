import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchRecipe } from "./recipesSlice";
import { fetchPlans } from "../plans/plansSlice";
import RenderRecipe from "./renderingShowPage/RenderRecipe";

const RecipeShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeStatus = useSelector((state) => state.recipes.soloStatus);
  const status = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.recipes.error);
  const recipe = useSelector((state) => state.recipes.recipe);

  useEffect(() => {
    dispatch(fetchRecipe({ id }));
  },[id, dispatch]);

    useEffect(() => {
      if (status === "idle") {
        dispatch(fetchPlans());
      }
    }, [status, dispatch]);

  let content;
  if (recipeStatus === "loading") {
    content = <div> Loading...</div>;
  } else if (recipeStatus === "succeeded") {
    content = <RenderRecipe recipe={recipe} />;
  } else if (recipeStatus === "error") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export default RecipeShow;
