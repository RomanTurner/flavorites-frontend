import PlanExcerpt from "./PlanExcerpt";
import React, { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllPlans } from "./plansSlice";
import { fetchPlans } from "../plans/plansSlice";

//MATERIAL UI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  loading: {
    paddingTop: "100px",
  },
  heading: {
    justifyContent: "center",
    alignText: "center",
    alignItems: "center",
    display: "flex",
    paddingTop: "25px",
    paddingBottom: "25px",
  },
}));

const PlansIndex = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const plans = useSelector(selectAllPlans);
  const status = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.plans.error);
  const filteredPlans = plans.filter(
    (plan) => plan.meal_plan_recipes.length !== 0
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlans());
    }
  }, [status, dispatch]);

  //Conditionally renders based off of the fetch status
  let content;
  if (status === "loading") {
    content = (
      <div className={classes.loading}>
        <LinearProgress color='secondary' />
      </div>
    );
  } else if (status === "succeeded") {
    content = filteredPlans.map((plan) => (
      <PlanExcerpt key={nanoid()} {...plan} />
    ));
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className={classes.root}>
      <Typography
        style={{
          textAlign: "center",
          margin: "20px",
          paddingTop: "20px",
          paddingBottom: "10px",
        }}
        variant='h3'
        color='primary'
        component='h3'
      >
        Meal Plans
      </Typography>
      {content}
    </section>
  );
};

export default PlansIndex;
