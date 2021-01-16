import React, { useState, useRef } from "react";
import {
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { makeStyles } from "@material-ui/core/styles";
import SavedMovieInfo from "../dialogMovie/SavedMovieInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: 40,
  },

  gridList: {
    width: 1400,
  },

  img: {
    // marginTop: 70,
    display: "block",
    margin: "0 auto",
    width: "80%",
    height: "auto",
  },

  gridImg: {
    cursor: "pointer",
    "&:hover": {
      opacity: "0.6",
    },
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
    color: "gray",
  },
}));

const SavedMovies = (props) => {
  const classes = useStyles();
  const [item, setItem] = useState("");
  const [selected, setSelected] = useState();
  const [show, setShow] = useState(false);
  const childRef = useRef(null);

  function handleClick(index, item) {
    setSelected(index);
    setItem(item);
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  };

  const getGridListCols = () => {
    if (isWidthUp("lg", props.width)) {
      return 6;
    }

    if (isWidthUp("md", props.width)) {
      return 4;
    }

    if (isWidthUp("xs", props.width)) {
      return 2;
    }

    return 1;
  };
  return (
    <div>
      {props.savedMovies && props.savedMovies.length > 0 ? (
        <div className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            Your movie list
          </Typography>
          <GridList
            cellHeight={250}
            cols={getGridListCols()}
            spacing={40}
            className={classes.gridList}>
            {props.savedMovies.map((movie, index) => (
              <GridListTile
                className={classes.gridImg}
                key={movie.id}
                className={index === selected ? "selected" : ""}
                key={`${index}`}>
                {movie.poster_path === null ? (
                  <img
                    onClick={() => {
                      handleClick(index, movie);
                    }}
                    src={`https://ceygate.com/content/themes/arkahost/assets/images/default-242x323.jpg`}
                    alt={movie.title}
                  />
                ) : (
                  <img
                    className={classes.gridImg}
                    onClick={() => {
                      handleClick(index, movie);
                    }}
                    src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <GridListTileBar
                  actionPosition={"right"}
                  title={movie.title}
                  subtitle={
                    <span>({movie.release_date})</span>
                  }></GridListTileBar>
              </GridListTile>
            ))}
            <SavedMovieInfo
              forwardedRef={childRef}
              handleClose={handleClose}
              show={show}
              item={item}
              onMovieDelete={props.onMovieDelete}
            />
          </GridList>
        </div>
      ) : (
        <Typography variant="h6" className={classes.title}>
          <img
            className={classes.img}
            src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
            alt="Empty list 🎥"
          />
        </Typography>
      )}
    </div>
  );
};

export default withWidth()(SavedMovies);
