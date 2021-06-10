import './App.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const font = "'Varela Round', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    fontSize: 16,
    fontWeightExtraLight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,
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
  },
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

