import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function RecipeExcerpt({ title, id, main_img }) {
  const classes = useStyles();
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  let content; 
  if (status !== "failed") {
    content = (
      <Card className={classes.root}>
      <CardActionArea to={`/recipes/${id}`} component={Link}>
        {status === "loading" ? (
          <Skeleton animation='wave' variant='rect' className={classes.media} />
        ) : (
          <CardMedia className={classes.media} image={main_img} title={title} />
        )}
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {status === "loading" ? (
              <Skeleton
                animation='wave'
                variant='rect'
              />
            ) : (
              title
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>)
  } else if (status === "failed"){
    content = <div>{error}</div>;
  }

  return content;
} 
