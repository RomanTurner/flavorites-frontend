import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import React, { useEffect } from "react";
import { fetchRecipe } from "./recipesSlice";
import { fetchPlans } from "../plans/plansSlice";
import { useSelector, useDispatch } from "react-redux";
import RenderRecipe from "./renderingShowPage/RenderRecipe";
import LinearProgress from "@material-ui/core/LinearProgress";

const RecipeShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
     content = (
       <div className={{ paddingTop: "100px" }}>
         <LinearProgress color='secondary' />
         {enqueueSnackbar('Add Recipe by Selecting From a Plan', { variant: 'info' })}
       </div>
     );
  } else if (recipeStatus === "succeeded") {
    content = <RenderRecipe recipe={recipe} />;
  } else if (recipeStatus === "error") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export default RecipeShow;
