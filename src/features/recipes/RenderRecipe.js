import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCurrentUsersPlans, addRecipeToPlan } from "../plans/planFetches";
import { nanoid } from "@reduxjs/toolkit"

//MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RenderRecipe = ({ recipe }) => {
  const {
    id,
    author,
    title,
    description,
    // metadata,
    main_img,
    // keywords,
    // ingriedients,
    // instructions,
    // instruction_imgs,
    // tips,
  } = recipe;

  const classes = useStyles();
  const history = useHistory();
  const lastLocation = sessionStorage.getItem("history");
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans.sessionPlans);
  const planStatus = useSelector((state) => state.plans.planStatus);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (planStatus === "idle") {
      dispatch(getCurrentUsersPlans());
    }
  }, [dispatch, planStatus]);

  const handleClick = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
        recipe_id: id,
        meal_plan_id: value,
    };

    dispatch(addRecipeToPlan(body))
      .then(unwrapResult)
      .then(({ meal_plan }) => history.push(`/meal_plans/${meal_plan}`)) //originalPromiseResult
      .catch((error) => console.error("error: ", error)); //rejectedValueOrSerializedError
  };

  //Renders form component to add a recipe to a meal plan
  const addRecipeToPlanForm = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='meal-plan-select'>Plans</InputLabel>
          <Select
            labelId='meal-plan-select'
            id='meal-plan-select'
            value={value}
            onChange={handleChange}
            label='Age'
          >
            {plans.map((p) => (
              <MenuItem key={nanoid()} value={p.id}>
                {p.title}
              </MenuItem>
            ))}
          </Select>
          <Button variant='outlined' type='submit'>
            Submit
          </Button>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
      </form>
    );
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>{author}</div>
      <div>
        <a href={"https://github.com/RomanTurner"}>
          <img src={main_img} alt={title} />
        </a>
      </div>
      <div>{description}</div>
      <button onClick={() => handleClick()}>Go Back</button>
      {lastLocation === "recipes" && addRecipeToPlanForm()}
    </div>
  );
};

export default RenderRecipe;
