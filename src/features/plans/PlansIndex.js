import PlanExcerpt from "./PlanExcerpt";
import React, { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllPlans } from "./plansSlice";
import { fetchPlans } from "../plans/plansSlice";
//MATERIAL UI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F4F9FE", 
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));



const PlansIndex = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const plans = useSelector(selectAllPlans);
  const status = useSelector((state) => state.plans.status);
  const error = useSelector((state) => state.plans.error);

  useEffect(() => {
   if (status === "idle") {
      dispatch(fetchPlans());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <div> Loading...</div>;
  } else if (status === "succeeded") {
    content = plans.map((plan) => <PlanExcerpt key={nanoid()} {...plan} />);
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className={classes.root}>
      <Typography
        style={{
          textAlign: "center",
          margin: "20px",
          backgroundColor: "#F1C8AB",
          paddingTop: "10px",
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
