import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {nanoid} from "@reduxjs/toolkit"
import { useParams } from "react-router";
import { selectPlanById } from "./plansSlice";
import { fetchPlans, deleteRecipeFromMealPlan } from "./planFetches";
import RecipeExcerpt from "../recipes/RecipeExcerpt";

const PlanShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipesStatus = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.plans.error);
  const plan = useSelector((state) => selectPlanById(state, +id));
  const lastLocation = sessionStorage.getItem('history')

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchPlans());
    }
  }, [recipesStatus, dispatch]);


  const handleDelete = (recipe) => {
    const body = {
      recipeId: recipe.id,
      mealPlan: id
    };
    dispatch(deleteRecipeFromMealPlan(body));
  };


  let content;
  if (recipesStatus === "loading") {
    content = <div> Loading...</div>;
  } else if (recipesStatus === "succeeded") {
    content = plan.recipes.map((recipe) => (
      <div key={nanoid()}>
        <RecipeExcerpt key={nanoid()} {...recipe} />
        {lastLocation === "dashboard" && (
          <button key={nanoid()} onClick={() => handleDelete(recipe)}>
            Delete
          </button>
        )}
      </div>
    ));

  } else if (recipesStatus === "error") {
    content = <div>{error}</div>;
  }

  if (!plan) {
    return (
      <section>
        <h2>Plan Not Found</h2>
      </section>
    );
  }
  return (
    <>
      <h2>{plan.title}</h2>
      {content}
    </>
  );
};

export default PlanShow;
