import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {nanoid} from "@reduxjs/toolkit"
import { useParams } from "react-router";
import { selectPlanById, fetchPlans } from "./plansSlice";
import RecipeExcerpt from "../recipes/RecipeExcerpt";

const PlanShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const plansStatus = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.plans.error);
  const plan = useSelector((state) => selectPlanById(state, +id));

  useEffect(() => {
    if (plansStatus === "idle") {
      dispatch(fetchPlans());
    }
  }, [plansStatus, dispatch]);




  let content;
  if (plansStatus === "loading") {
    content = <div> Loading...</div>;
  } else if (plansStatus === "succeeded") {
    content = plan.meal_plan_recipes.map((recipe) => (
      <div key={nanoid()}>
        <RecipeExcerpt key={nanoid()} {...recipe} />
      </div>
    ));
  } else if (plansStatus === "error") {
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
