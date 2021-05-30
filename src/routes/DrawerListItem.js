import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {nanoid} from "@reduxjs/toolkit"
//MATERIAL UI
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import KitchenOutlinedIcon from "@material-ui/icons/KitchenOutlined";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


export default function DrawerListItem() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const stuff = [
    {
      path: "/meal_plans",
      text: "Explore Meal Plans",
      icon: KitchenOutlinedIcon,
    },
    {
      path: "/recipes",
      text: "Explore Recipes",
      icon: RestaurantOutlinedIcon,
    },
    {
      path: "/dashboard",
      text: "Dashboard",
      icon: DashboardOutlinedIcon,
    },
  ];

  const nestedListItems = stuff.map((item) => {
    return (
      <ListItem
        key={nanoid()}
        button
        to={item.path}
        component={Link}
        className={classes.nested}
      >
        <ListItemIcon>
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    );
  });

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary='Inbox' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {nestedListItems}
        </List>
      </Collapse>
    </List>
  );
}
