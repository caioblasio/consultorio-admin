import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import { Route, Switch } from "react-router";
import Main from "components/Main";
import configureStore, { history } from "./store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={Main} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);
