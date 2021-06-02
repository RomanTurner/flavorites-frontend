import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserPlanExcerpt from "../user-plans/UserPlansExcerpt";
import { fetchSession } from "../session/sessionSlice";
import { nanoid } from "@reduxjs/toolkit"
import {
  createMealPlan,
  getCurrentUsersPlans,
} from "../user-plans/planFetches";

//MATERIAL UI
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
  const status = useSelector((state) => state.userPlans.status);
  const mealPlans = useSelector((state) => state.userPlans.plans);
  const error = useSelector((state) => state.session.error);
 
  useEffect(() => {
    if (status === "idle") {
      dispatch(getCurrentUsersPlans());
      dispatch(fetchSession());
    }
  }, [status, dispatch]);

  let mealPlanContent;
  if (status === "loading") {
    mealPlanContent = <div> Loading...</div>;
  } if (status === "succeeded") {
    //Maps content for the session user's meal plans
    mealPlanContent = mealPlans.map((plan) => (
      <UserPlanExcerpt key={nanoid()} {...plan} />
    ));
  } if (status === "failed") {
    mealPlanContent = <div>{error}</div>;
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMealPlan({ title: value }));
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
      <div>{mealPlanContent}</div>
      <div>{mealPlanForm}</div>
    </section>
  );
};

export default Dashboard;
