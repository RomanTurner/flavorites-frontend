import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

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
  return (
    <Card className={classes.root}>
      <CardActionArea to={`/recipes/${id}`} component={Link}>
        <CardMedia className={classes.media} image={main_img} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
