import { Link } from "react-router-dom";
import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import AddRecipeSelect from "./AddRecipeSelect";
//MATERIAL UI
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import KitchenOutlinedIcon from "@material-ui/icons/KitchenOutlined";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  li: {
    marginBottom: "8px",
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(4),
    "&:hover": { backgroundColor: "#F1C8AB" },
  },
}));


export default function DrawerListItem() {
  const location = useLocation();
  const classes = useStyles();
  const path = location.pathname;
  //conditionally renders select on drawer when on recipe/show page
  const onRecipePage =
    path.split("/")[2] !== undefined && path.split("/")[1] === "recipes";
  const [open, setOpen] = useState(!onRecipePage);

  const handleClick = () => {
    setOpen(!open);
  };

  const menuListItems = [
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

  //VpnKeyIcon;
  const nestedListItems = menuListItems.map((item) => {
    return (
      <>
        <Divider />
        <ListItem
          className={classes.li}
          style={
            path === item.path
              ? { backgroundColor: "#F1C8AB" }
              : { backgroundColor: "theme.palette.background.paper" }
          }
          key={nanoid()}
          button
          to={item.path}
          component={Link}
        >
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "#375E83" }}>
              <item.icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.text} />
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
    <>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            SpruceEats Recipes
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem className={classes.li} button onClick={handleClick}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "#375E83" }}>
              <MenuBookIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Menu' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {nestedListItems}
          </List>
        </Collapse>
      </List>
      <List>{onRecipePage && <AddRecipeSelect />}</List>
    </>
  );
}
