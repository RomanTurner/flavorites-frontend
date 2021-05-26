import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { selectRecipeById, fetchRecipes } from "./recipesSlice";

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  const offset = useSelector((state) => state.recipes.offset);
  const count = useSelector((state) => state.recipes.count);
  const limit = useSelector((state) => state.recipes.limit);
  
  useEffect(() => {
      if (recipesStatus === "idle") {
          dispatch(fetchRecipes({ limit, offset }));
        }
    }, [recipesStatus, dispatch]);
    
    const recipe = useSelector((state) => selectRecipeById(state, +id));

    return <div>hi</div>;
};


export default RecipePage;
