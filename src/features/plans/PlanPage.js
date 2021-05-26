import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { selectPlanById, fetchPlans } from "./plansSlice";
import RecipeExcerpt from "../recipes/RecipeExcerpt";

const PlanPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipesStatus = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.plans.error);

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchPlans());
    }
  }, [recipesStatus, dispatch]);

  const plan = useSelector((state) => selectPlanById(state, +id));

    let content;
    if (recipesStatus === "loading") {
      content = <div> Loading...</div>;
    } else if (recipesStatus === "succeeded") {
      content = plan.recipes.map((recipe) => (
        <RecipeExcerpt key={recipe.id} {...recipe} />
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

export default PlanPage;
