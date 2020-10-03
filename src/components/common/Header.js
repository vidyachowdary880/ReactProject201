import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({});
function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Airlines Portal
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
