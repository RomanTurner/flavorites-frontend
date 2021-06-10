import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import Rating from '@material-ui/lab/Rating';
import Skeleton from "@material-ui/lab/Skeleton";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



const RecipeExcerpt = ({ title, id, main_img }) => {
  const classes = useStyles();
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  const rating = 3.5
  //did creatte a random rating, it was rerender everytime that I used the control form. 
  // const rating = Math.round((Math.random() * (5 - 3 + 1) + 3) / 0.5) * 0.5;
  
  //sanitizes the authors images out of the excerpt
  const regex = new RegExp("webp*");
  const imgTest = regex.test(main_img)
  const img = imgTest ? main_img : "https://www.thespruceeats.com/thmb/1CjAC8Zr29zcoXNHtq5DgJ45lYs=/1001x1001/filters:fill(auto,1)/SPRE_SocialImage-no-transparency-5ad5fc0bc5542e00362c0baa.png" 
  
  
  let content;
  if ( status !== "failed" ) {
    content = (
      <Card className={classes.root}>
        <CardActionArea to={`/recipes/${id}`} component={Link}>
          {status === "loading" ? (
            <Skeleton
              animation='wave'
              variant='rect'
              className={classes.media}
            />
          ) : (
            <CardMedia className={classes.media} image={img} title={title} />
          )}
          <CardContent>
            <Typography gutterBottom variant='body1' component='p'>
              {status === "loading" ? (
                <Skeleton animation='wave' variant='rect' />
              ) : (
                title
              )}
            </Typography>
          </CardContent>
          {status === "loading" ? (
            <Rating
              name='customized-empty'
              defaultValue={5}
              icon={<StarBorderIcon fontSize='inherit' />}
              readOnly
            />
          ) : (
            <Rating
              name='customized-empty'
              defaultValue={rating}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize='inherit' />}
              readOnly
            />
          )}
        </CardActionArea>
      </Card>
    );
  } else if (status === "failed"){
    content = <div>{error}</div>;
  }

  return content;
} 

export default React.memo(RecipeExcerpt);