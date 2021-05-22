import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { StyledTitle } from "./styles";

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <StyledTitle variant="h6">News</StyledTitle>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
