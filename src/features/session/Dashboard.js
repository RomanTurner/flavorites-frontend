import DirectionStepper from "./DirectionStepper";
import { nanoid } from "@reduxjs/toolkit"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSession } from "../session/sessionSlice";
import UserPlanExcerpt from "../user-plans/UserPlansExcerpt";
import { createMealPlan, getCurrentUsersPlans } from "../user-plans/planFetches";

//MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import LinearProgress from "@material-ui/core/LinearProgress";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px",
  },
  main: {
    backgroundColor: "secondary",
  },
  subtitle: {
    paddingBottom: "10px",
  },
  columnOne: {
    paddingTop: "20px",
    justifyContent: "center",
  },
  columnTwo: {
    paddingTop: "20px",
    paddingLeft: "20px",
    backgroundColor: "#F4F9FE",
    justifyContent: 'space-evenly',
  },
  formControl: {
    alignText:'center',
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const Dashboard = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const planStatus = useSelector((state) => state.userPlans.status);
  const sessionStatus = useSelector((state) => state.session.planStatus);
  const mealPlans = useSelector((state) => state.userPlans.plans);
  const error = useSelector((state) => state.session.error);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (planStatus === "idle") {
      dispatch(getCurrentUsersPlans());
    }
  }, [planStatus, dispatch]);

  useEffect(() => {
    if (sessionStatus === "idle") {
      dispatch(fetchSession());
    }
  }, [sessionStatus, dispatch]);

  let mealPlanContent;
  if (planStatus === "loading") {
    mealPlanContent = (
      <div className={{ paddingTop: "100px" }}>
        <LinearProgress color='primary' />
      </div>
    );
  } if (planStatus === "succeeded" && sessionStatus === "succeeded") {
    //Maps content for the session user's meal plans
    mealPlanContent = mealPlans.map((plan) => (
      <Grid item md={4} xs={12} className={classes.plans}>
        <UserPlanExcerpt key={nanoid()} {...plan} />
      </Grid>
    ));
  } if (planStatus === "failed") {
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
    <form className={classes.formControl} onSubmit={(e) => handleSubmit(e)}>
      <FormControl fullWidth variant='outlined'>
        <TextField
          id='outlined-name'
          label='Title'
          value={value}
          onChange={handleChange}
          variant='outlined'
        />
        <Button color='secondary' variant='contained' type='submit'>
          Submit
        </Button>
        <FormHelperText>' i.e. "Southwest Fusion Week" '</FormHelperText>
      </FormControl>
    </form>
  );

  return (
    <Grid className={classes.root}>
      <Grid container className={classes.heading}>
        <Grid item>
          <Typography
            align='center'
            variant='h2'
            color='primary'
            component='h6'
          >
            Dashboard
          </Typography>
        </Grid>
      </Grid>
      {/* Main */}
      <Paper>
        <Grid container className={classes.main}>
          <Grid className={classes.columnOne} container md={12}>
            {/*column 1 */}
            <Grid item className={classes.subtitle}>
              <Typography
                align='center'
                variant='h4'
                color='primary'
                component='h6'
              >
                Create New Meal Plan
              </Typography>
              <DirectionStepper />
            <Grid item md={12}>
              {mealPlanForm}
            </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.columnTwo} container md={12}>
            {/*column 2*/}
            <Grid item md={12}>
              <Typography
                className={classes.subtitle}
                align='center'
                variant='h4'
                color='primary'
                component='h6'
              >
                Your Meal Plans
              </Typography>
            </Grid>
             {mealPlanContent}
          </Grid>
        </Grid>
      </Paper>
      {/* Main */}
    </Grid>
  );
};

export default Dashboard;
