import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);

