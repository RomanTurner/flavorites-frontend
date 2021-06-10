import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { nanoid } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUsersPlans,
  addRecipeToPlan,
} from "../features/user-plans/planFetches";

//MATERIAL UI

import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 200,
    "& .MuiOutlinedInput-input": {
      color: "#F1C8AB",
    },
    "& .MuiInputLabel-root": {
      color: "#black",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F1C8AB",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "##F1C8AB",
    },
    "&:hover .MuiInputLabel-root": {
      color: "black",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#375E83",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#375E83",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#black",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#375E83",
    },
  },
  select: {
    marginTop: theme.spacing(2),
    "&:hover": { backgroundColor: "#F1C8AB" },
  },
}));


//Renders form component to add a recipe to a meal plan
const AddRecipeSelect = () => {
  const  { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.userPlans.plans);
  const planStatus = useSelector((state) => state.userPlans.status);
  const [value, setValue] = useState("");


  //grabs the plans from the store to map the names in the select form
  useEffect(() => {
    if (planStatus === "idle") {
      dispatch(getCurrentUsersPlans());
    }
  }, [dispatch, planStatus]);

  //value is the id of the meal plan
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //when selecting the name of meal plan to add the recipe to we grab the id in the value
  //we want to set the inital value of the plan to
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      recipe_id: id,
      meal_plan_id: value,
    };

    dispatch(addRecipeToPlan(body))
      .then(unwrapResult)
      .then(({ id }) => {
        enqueueSnackbar("Recipe Added!", { variant: "success" });
        history.push(`/user_plans/${id}`);
      }) //originalPromiseResult
      .catch((error) => console.error("error: ", error)); //rejectedValueOrSerializedError
  };

  return (
    <>
      <Typography
      align='center'
      >
      Select A Plan From Here
    </Typography>
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl
        style={{ width: "90%" }}
        variant='outlined'
        className={classes.formControl}
      >
        <InputLabel id='meal-plan-select'>Plans</InputLabel>
        <Select
          labelId='meal-plan-select'
          id='meal-plan-select'
            value={value}
            variant='filled'
          onChange={handleChange}
          required
        >
          {plans.map((p) => (
            <MenuItem key={nanoid()} value={p.id}>
              {p.title}
            </MenuItem>
          ))}
        </Select>
        <Button
          className={classes.select}
          variant='outlined' type='submit'>
          Submit
        </Button>
        <FormHelperText>You must select one of your meal plans</FormHelperText>
      </FormControl>
      </form>
      </>
  );
};

export default AddRecipeSelect;
