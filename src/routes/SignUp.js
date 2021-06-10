import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory, Link } from "react-router-dom";
import { signUpFetch } from "../features/session/sessionSlice";

//MATERIAL UI
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © Flavorites"} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [error, isError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [helperText, setHelperText] = useState('only unique usernames allowed');
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChange = (event, type) => {
    let stateMap = {
      username: (event) => setUsername(event.target.value),
      password: (event) => setPassword(event.target.value),
    };
    stateMap[type](event);
  };
  
  const setPagination = () => {
    localStorage.setItem("counter", 0);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signUpFetch({ username, password }));
      const status = unwrapResult(result);
      if (status.message === undefined) {
         setPagination();
         history.push("/dashboard");
      } else {
        console.log(status);
        isError(true);
        setHelperText(status.message);
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error("Failed to fetch the user: ", err);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up!
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={(event) => handleChange(event, "username")}
            id='username'
            label='Username'
            name='username'
            error={error}
            helperText={helperText}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={(event) => handleChange(event, "password")}
            name='password'
            label='Password'
            type='password'
            id='password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
            onClick={(e) => handleLogin(e)}
          >
            Sign up
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link to='/login' variant='body2'>
              {"Already have an account? Login!"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
