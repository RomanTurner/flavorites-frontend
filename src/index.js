import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from "notistack";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Work Sans, sans-serif",
  },
  status: {
    success: "#F1C8AB",
  },
  palette: {
    primary: {
      main: "#375E83",
    },
    secondary: {
      main: "#F1C8AB",
    },
  }
});


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

