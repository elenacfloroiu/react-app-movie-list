import React, { useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Typography, Tooltip, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    paddingTop: 0,
    padding: theme.spacing(2),
    margin: "auto",
    marginRight: 0,
    maxWidth: 800,
  },

  dialogTitle: {
    padding: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  img: {
    padding: 0,
    margin: "auto",
    display: "block",
    width: 260,
    height: 380,
    maxWidth: "100%",
    maxHeight: "100%",
  },

  remove: {
    margin: theme.spacing(2),
  },

  fab: {
    margin: theme.spacing(2),
    background:
      "radial-gradient(circle, rgba(215,165,187,1) 0%, rgba(122,122,135,1) 100%);",
    pointerEvents: "none",
  },

  fav: {
    margin: theme.spacing(2),
  },
}));

const ViewMovieInfo = (props) => {
  const classes = useStyles();
  const movie = props.item;

  return (
    <Dialog
      ref={props.forwardRef}
      open={props.show}
      TransitionComponent={Transition}
      key={movie.id}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className={classes.dialogTitle}>
        <Tooltip title="Close">
          <IconButton aria-label="close" onClick={props.handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {movie.poster_path === null ? (
              <img
                src={`https://ceygate.com/content/themes/arkahost/assets/images/default-242x323.jpg`}
                alt={movie.title}
                className={classes.img}
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                alt={movie.title}
                className={classes.img}
              />
            )}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" gutterBottom>
                  <b> {movie.title}</b>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Fab
                    variant="extended"
                    className={classes.fab}
                    size="small"
                    color="primary">
                    <span>{movie.release_date}</span>
                  </Fab>

                  <Fab
                    variant="extended"
                    className={classes.fab}
                    size="small"
                    color="primary">
                    <span>{movie.vote_average}</span>
                  </Fab>
                  <Tooltip title="Mark as favorite">
                    <Fab
                      className={classes.fav}
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        props.onMovieAdd(movie);
                      }}
                      aria-label="like">
                      <FavoriteIcon />
                    </Fab>
                  </Tooltip>
                </Typography>
                <Typography
                  style={{ marginTop: "0.34em" }}
                  variant="subtitle1"
                  gutterBottom>
                  <b>Overview:</b>
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {movie.overview}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewMovieInfo;
