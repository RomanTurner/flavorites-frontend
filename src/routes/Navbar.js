import React from "react";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import DrawerListItem from "./DrawerListItem";
import logo from "../img/logo-transparent.svg";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    minHeight: "100px",
    zIndex: theme.zIndex.drawer + 1,
    background: "#375E83",
  },
  drawer: {
    marginTop: "50px",
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: "50px",
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    maxHeight: "120px",
  },
  menuButton: {
    marginLeft: "auto",
    color: "white",
    width: 30,
    height: 40,
  },
}));

export default function Navbar({children}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const loggingOut = () => {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.reload();
    };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <img src={logo} alt='logo' className={classes.logo} />
          <IconButton
            className={classes.menuButton}
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon fontSize='large' />
          </IconButton>
          <Menu
            id='long-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MenuItem selected={"Pyxis"} onClick={handleClose}>
              <AccountCircleIcon fontSize='medium' /> Profile{" "}
            </MenuItem>
            <MenuItem selected={"Pyxis"} onClick={loggingOut}>
              <ExitToAppIcon fontSize='large' /> Logout{" "}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <DrawerListItem />
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
}
