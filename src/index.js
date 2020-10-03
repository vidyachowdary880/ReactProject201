import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { CookiesProvider } from "react-cookie";
const store = configureStore();

render(
  <CookiesProvider>
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
  </CookiesProvider>,
  document.getElementById("app")
);
