import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    textShadow: "-1px 3px 12px rgba(0,0,0,0.59)",
    fontFamily: "Sirin Stencil, cursive",
    fontSize: 25,
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={{ backgroundColor: "#b8a9c9" }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Movie🎥List
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
