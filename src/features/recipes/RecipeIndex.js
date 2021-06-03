import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllRecipes, fetchRecipes, searchRecipes } from "./recipesSlice";
import RecipeExcerpt from "./RecipeExcerpt";
import { nanoid } from "@reduxjs/toolkit";
//MATERIAL UI
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const RecipesIndex = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  const counter = localStorage.getItem("counter");

  const [search, setSearch] = useState('');

   const handleChange = (event) => {
     setSearch(event.target.value);
   };
    
  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes(counter));
    }
  }, [recipesStatus, dispatch, counter]);

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
      <Pagination onChange={handlePage} count={56} variant='outlined' />
    </div>
  );

  const onSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(searchRecipes(search));
  }

  const searchbar = (
    <div className={classes.search}>
      <form onSubmit={(e) =>onSearchSubmit(e)} > 
      <TextField
        error={!!error}
        id='filled-full-width'
        label={<SearchIcon />}
        style={{ margin: 8 }}
        placeholder='Search'
        helperText={!!error ? error : "Search recipes by keywords included in the title."}
        fullWidth
        value={search}
        onChange={handleChange}
       
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        variant='filled'
        />
        {/* <Button variant="outlined">Submit</Button> */}
        </form>
    </div>
  );

  return (
    <section className='posts-list'>
      <h2>Recipes</h2>
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
