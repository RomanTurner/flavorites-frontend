import React from "react";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  li: {
    "&:hover": { backgroundColor: "#F4F9FE" },
  },
}));

const Ingredients = ({ ingriedients }) => {
  const classes = useStyles();
  
  const content = (
    <List className={classes.root}>
      {ingriedients.map((el) => (
        <ListItem className={classes.li} button>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "#375E83" }}>
              <RestaurantMenuIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={el} />
        </ListItem>
      ))}
    </List>
  );

  return <>{content}</>;
};

export default Ingredients;
