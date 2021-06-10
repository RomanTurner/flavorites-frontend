import {nanoid} from "@reduxjs/toolkit"
import React, { useEffect } from "react";
import { useParams } from "react-router";
import RecipeExcerpt from "../recipes/RecipeExcerpt";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { selectPlanById, fetchPlans } from "./plansSlice";
//MATERIAL UI
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";


const PlanShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.plans.error);
  const plansStatus = useSelector((state) => state.plans.status);
  const plan = useSelector((state) => selectPlanById(state, +id));

  useEffect(() => {
    if (plansStatus === "idle") {
      dispatch(fetchPlans());
    }
  }, [plansStatus, dispatch]);


  //Conditionally renders based off of the fetch status
  let content;
  if (plansStatus === "loading") {
      content = (
        <div className={{ paddingTop: "100px" }}>
          <LinearProgress color='secondary' />
        </div>
      );
  } else if (plansStatus === "succeeded") {
    content = plan.meal_plan_recipes.map((recipe) => (
      <Grid key={nanoid()} item xs={12} sm={6} md={3}>
        <RecipeExcerpt key={nanoid()} {...recipe} />
      </Grid>
    ));
  } else if (plansStatus === "error") {
    content = <div>{error}</div>;
  }

  //If the data is fetching there will be a default on the screen during the initial component mount
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
          textAlign: "center",
          margin: "10px",
          backgroundColor: "#F4F9FE",
          paddingTop: "30px",
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
