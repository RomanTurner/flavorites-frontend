import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllRecipes, fetchRecipes } from "./recipesSlice";
import RecipeExcerpt from "./RecipeExcerpt";
import { nanoid } from "@reduxjs/toolkit";
//MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const RecipesIndex = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  const counter = localStorage.getItem("counter");

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes(counter));
    }
  }, [recipesStatus, dispatch, counter]);

  let content;
  if (recipesStatus === "loading") {
    content = <div> Loading...</div>;
  } else if (recipesStatus === "succeeded") {
    content = recipes.map((recipe) => (
      <Grid key={nanoid()} item xs={3}>
        <RecipeExcerpt key={nanoid()} {...recipe} />
      </Grid>
    ));
  } else if (recipesStatus === "failed") {
    content = <div>{error}</div>;
  }

  const handleChange = (e, value) => {
    dispatch(fetchRecipes(value));
  };

  const pagination = (
    <div className={classes.root}>
      <Pagination onChange={handleChange} count={28} variant='outlined' />
    </div>
  );

  return (
    <section className='posts-list'>
      <h2>Recipes</h2>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {content}
        </Grid>
        {pagination}
      </div>
    </section>
  );
};

export default RecipesIndex;
