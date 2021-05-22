import React from "react";
import { Route, Switch } from "react-router";
import { CssBaseline } from "@material-ui/core";
import Header from "containers/Header";
import Home from "pages/dashboard/Home";
import Patient from "pages/dashboard/Patient";

const Component = () => {
  return (
    <main className="main">
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path="/" component={Patient} />
      </Switch>
    </main>
  );
};

export default Component;
