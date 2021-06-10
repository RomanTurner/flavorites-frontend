import React from "react";
import moment from 'moment';
import { nanoid } from "@reduxjs/toolkit";
import { deletePlan } from "./planFetches";
import { selectPlanById } from "./userPlanSlice";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DialogEmptyMealPlan from "./DialogEmptyMealPlan";
//MATERIAL UI
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import GridListTile from "@material-ui/core/GridListTile";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    display: 'flex',
    flexWrap: 'wrap',
    alignText: 'center', 
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: "#F4F9FE",
    marginBottom: '10px',
  },
  gridList: {
    maxHeight: 200,
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
  deleButton: {
    padding: '5px',
    margin: '5px',
    "&:hover": {
      color: 'white',
      borderColor: "#ab003c",
      backgroundColor: "#ab003c",
    },
  }
}));



const UserPlanExcerpt = ({title, id, meal_plan_recipes, created_at}) => {
  const deleteMealPlanStatus = useSelector(state => state.userPlans.deleteMealPlanStatus)
  const plan = useSelector(state => selectPlanById(state, +id));
  const error = useSelector((state) => state.userPlans.error);
  let date = moment(created_at).format("MMM DD, YYYY");  
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const handleDelete = () => {
    dispatch(deletePlan(+id));
  };
  
 let content;
 if (deleteMealPlanStatus === "loading") {
   content = <Button variant="outlined" disabled>Delete</Button>;
 } else if (deleteMealPlanStatus === "idle") {
   content = <Button className={classes.deleButton} variant="outlined" color="primary" onClick={() => handleDelete()}>Delete</Button>;
 } else if (deleteMealPlanStatus === "error") {
   content = (
     <div>
       <Button variant="outlined" color="primary" onClick={() => handleDelete()}>Delete</Button>
       {error}
     </div>
   );
 }

  //Creates a vertical, scrollable list of tiles that display the 
  //recipe name and image
  const imgTile = (
      <GridList cellHeight={100} className={classes.gridList} cols={3}>
      {meal_plan_recipes.map((recipe, index) => {
        //My scrapper grabbed the photo of the author half the time so we clear that with a default
        //We do this so it doesn't look like we eat people. 
          const regex = new RegExp("webp*");
          const imgTest = regex.test(recipe.main_img);
          const img = imgTest
            ? recipe.main_img
            : "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png";

          return (
            <GridListTile key={recipe.img} >
              <img key={nanoid()} src={img} alt={recipe.title} />
            </GridListTile>
          );
        })}
      </GridList>
  );

  const EditButton = (
    plan.meal_plan_recipes.length === 0 ? <DialogEmptyMealPlan id={id} /> : (
      <Button
       component={Link}
       to={`/user_plans/${id}`}
       style={{ width: "80%" }}
       variant='contained'
       color='secondary'
        >
        Edit
      </Button>
      )

  );

  return (
    <Grid
      className={classes.root}
      style={{ backgroundColor: "#F4F9FE" }}
      container
      direction='column'
      justify='space-around'
      alignItems='center'
    >
      <Grid item xs={12} style={{ paddingBottom: "10px" }}>
        <Card className={classes.root}>
              <CardContent >
            <CardMedia
              component={Link}
              to={`/user_plans/${id}`}
              className={classes.media}>
                {imgTile}
            </CardMedia>
              <Typography
                align='center'
                className={classes.title}
                variant='h6'
                color='primary'
                component='h6'>
                  {title}
            </Typography>
            <CardHeader
              align='center'
               subheader={`Created ${date}`}
              />
              </CardContent>
          <CardActions>
            {EditButton}
            {content}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserPlanExcerpt;
