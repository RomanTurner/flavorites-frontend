import React from "react";
import { Link } from 'react-router-dom'
//MATERIAL UI
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import GridListTile from "@material-ui/core/GridListTile";
import CardActionArea from "@material-ui/core/CardActionArea";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.secondary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function PlanExcerpt({title, id, meal_plan_recipes}) {
  const classes = useStyles();
 
  const imgTile = (
    <GridList cellHeight={160} className={classes.gridList} cols={3.5} >
      {meal_plan_recipes.map((recipe) => {
        const regex = new RegExp("webp*");
        const imgTest = regex.test(recipe.main_img);
        const img = imgTest
          ? recipe.main_img
          : "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png";

        return (
          <GridListTile key={recipe.img}>
            <img src={img} alt={recipe.title} />
            <GridListTileBar
              title={recipe.title}
              actionIcon={
                <IconButton
                  aria-label={`info about ${recipe.title}`}
                  className={classes.title}
                >
                  <StarBorderIcon />
                </IconButton>
              }
            />
          </GridListTile>
        );
      })}
    </GridList>
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
          <CardActionArea>
            <CardContent>
              {imgTile}
              <Typography variant='h3' color='primary' component='h3'>
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              style={{ width: "100%" }}
              component={Link}
              to={`/meal_plans/${id}`}
              variant='contained'
              color='secondary'
            >
              See More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
