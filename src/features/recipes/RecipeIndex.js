import { nanoid } from "@reduxjs/toolkit";
import RecipeExcerpt from "./RecipeExcerpt";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllRecipes, fetchRecipes, searchRecipes } from "./recipesSlice";
//MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  heading: {
    textAlign: "center",
    margin: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
  }
}));

const RecipesIndex = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const error = useSelector((state) => state.recipes.error);
  const recipesStatus = useSelector((state) => state.recipes.status);
  
  
  //set pagination based on location -is persistant
  const counter = localStorage.getItem("counter");
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes(counter));
    }
  }, [recipesStatus, dispatch, counter]);

  //controlled form
   const handleChange = (event) => {
     setSearch(event.target.value);
   };
    

  let content = recipes.map((recipe) => (
    <Grid key={nanoid()} item xs={12} sm={6} md={3}>
     <RecipeExcerpt key={nanoid()} {...recipe} />
    </Grid>
  ));

  const handlePage = (e, value) => {
    dispatch(fetchRecipes(value));
  };


  const pagination = (
    <div className={classes.root}>
      <Pagination
        defaultPage={+counter}
        onChange={handlePage}
        count={56}
        variant='outlined'
      />
    </div>
  );

  const onSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(searchRecipes(search));
  }

  const searchbar = (
    <div className={classes.search}>
      <form onSubmit={(e) => onSearchSubmit(e)}>
        <Grid
          container
          direction='column'
          justify='space-around'
          alignItems='center'
          style={{ backgroundColor: "#F4F9FE" }}
        >
          <Grid item xs={12}>
            <TextField
              error={!!error}
              id='filled-full-width'
              label={<SearchIcon />}
              style={{ margin: 8 }}
              placeholder='Search'
              helperText={
                !!error
                  ? error
                  : "Search recipes by keywords included in the title."
              }
              fullWidth
              value={search}
              onChange={handleChange}
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => onSearchSubmit(e)}
              variant='contained'
              size='large'
              color='primary'
              variant='outlined'
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <section className='posts-list'>
      <Typography
        className={classes.heading}
        variant='h2'
        color='primary'
        component='h3'
      >
        Recipes
      </Typography>
      <div className={classes.root}>
        {searchbar}
        <Grid container spacing={3}>
          {content}
        </Grid>
        {pagination}
      </div>
    </section>
  );
};

export default RecipesIndex;
