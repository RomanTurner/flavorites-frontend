import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlanExcerpt from "../plans/PlanExcerpt";
import {
  createMealPlan,
  getCurrentUsersPlans,
} from "../plans/planFetches";
import { fetchSession } from "../session/sessionSlice";
import RenderFollow from "./RenderFollow";
import FollowContainer from "./FollowContainer";
import { nanoid } from "@reduxjs/toolkit"
//import RecipeExcerpt from "../recipes/RecipeExcerpt";

import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles;
  const [value, setValue] = useState("");
  const planStatus = useSelector((state) => state.plans.planStatus);
  const mealPlans = useSelector((state) => state.plans.sessionPlans);
  const error = useSelector((state) => state.session.error);
  const followers = useSelector((state) => state.session.followers);
  const following = useSelector((state) => state.session.following);

  useEffect(() => {
    if (planStatus === "idle") {
      dispatch(getCurrentUsersPlans());
      dispatch(fetchSession());
    }
  }, [planStatus, dispatch]);

  let mealPlanContent;
  let followingContent;
  let followersContent;

  if (planStatus === "loading") {
    mealPlanContent = <div> Loading...</div>;
  } else if (planStatus === "succeeded") {
    //Maps content for the session user's meal plans
    mealPlanContent = mealPlans.map((plan) => (
      <PlanExcerpt key={nanoid()} {...plan} />
    ));
    //Maps content for users that the session user is being followed by
    followersContent = (
      <FollowContainer title={"Who is Following You"}>
        {followers.map((follow) => (
          <RenderFollow key={nanoid()} {...follow} />
        ))}
      </FollowContainer>
    );
  
    //Maps content for users the session user is following
    followingContent =
      following.length === 0 ? (
        <div>Following No One</div>
      ) : (
        <FollowContainer title={"Who You are Following"}>
          {following.map((follow) => (
            <RenderFollow key={nanoid()} {...follow} />
          ))}
        </FollowContainer>
      );
  } else if (planStatus === "failed") {
    mealPlanContent = <div>{error}</div>;
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMealPlan({ meal_plan: { title: value } }));
    setValue('');
  };

  const mealPlanForm = (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl variant='outlined' className={classes.formControl}>
        <TextField
          id='outlined-name'
          label='Name New Meal Plan'
          value={value}
          onChange={handleChange}
          variant='outlined'
        />
        <Button variant='outlined' type='submit'>
          Submit
        </Button>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
    </form>
  );

  return (
    <section className='posts-list'>
      <h2>Dashboard</h2>
      {mealPlanContent}
      {followingContent}
      {followersContent}
      {mealPlanForm}
    </section>
  );
};

export default Dashboard;
