import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Page from "pages";

const Dashboard = ({ title, children }) => {
  return (
    <Page>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Page>
  );
};

export default Dashboard;
