import {nanoid} from "@reduxjs/toolkit"
import React, { useEffect } from "react";
import { useParams } from "react-router";
import RecipeExcerpt from "../recipes/RecipeExcerpt";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { selectPlanById, fetchPlans } from "./plansSlice";
//MATERIAL UI

import Grid from "@material-ui/core/Grid";
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
      <Grid key={nanoid()} item xs={12} sm={6} md={3}>
        <RecipeExcerpt key={nanoid()} {...recipe} />
      </Grid>
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
    <div style={{ paddingTop: "10px" }}>
      <Typography
        style={{
          textAlign: 'center',
          margin: '10px',
          backgroundColor: "#F1C8AB",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
        variant='h3'
        color='primary'
        component='h3'
      >
        {plan.title}
      </Typography>
      <Grid container spacing={3}>
        {content}
      </Grid>
    </div>
  );
};

export default PlanShow;
