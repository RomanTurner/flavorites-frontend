import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchRecipe } from "./recipesSlice";
import RenderRecipe from "./RenderRecipe"

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  
  
  useEffect(() => {
        dispatch(fetchRecipe({ id }));
    }, []);
    
const recipe = useSelector((state) => state.recipes.recipe);
   
      let content;
      if (recipesStatus === "loading") {
        content = <div> Loading...</div>;
      } else if (recipesStatus === "succeeded") {
        content = <RenderRecipe recipe={recipe} />
      } else if (recipesStatus === "error") {
        content = <div>{error}</div>;
      }
  
  
      return (
        <section>
          {content}
        </section>
      );
};


export default RecipePage;
