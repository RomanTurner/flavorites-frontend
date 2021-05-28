import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchLogin } from "../features/session/sessionSlice";
import { useDispatch } from "react-redux";
// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// LOGIN COMPONENT
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      await dispatch(fetchLogin({ username, password }));
      setPagination();
      history.push("/meal_plans");
    } catch (err) {
      console.error("Failed to fetch the user: ", err);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        onChange={(event) => handleChange(event, "username")}
        id='username'
        label='Username'
        name='username'
        autoFocus
      />
      <TextField
        name='password'
        onChange={(event) => handleChange(event, "password")}
        id='password'
        label='Password'
        type='password'
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        onClick={(e) => handleLogin(e)}
      >
        Log In
      </Button>
    </form>
  );
};
export default Login;
