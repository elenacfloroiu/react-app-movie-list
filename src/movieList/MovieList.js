import React, { useState, useRef } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { makeStyles } from "@material-ui/core/styles";
import ViewMovieInfo from "../dialogMovie/ViewMovieInfo";

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

  gridImg: {
    cursor: "pointer",
    "&:hover": {
      opacity: "0.6",
    },
  },
}));

const MovieList = (props) => {
  const classes = useStyles();

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

    return 2;
  };

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

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={250}
        cols={getGridListCols()}
        spacing={40}
        className={classes.gridList}>
        {props.movies.map((movie, index) => (
          <GridListTile
            key={movie.id}
            className={index === selected ? "selected" : ""}
            key={`${index}`}>
            {movie.poster_path === null ? (
              <img
                className={classes.gridImg}
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
              subtitle={<span>({movie.release_date})</span>}></GridListTileBar>
          </GridListTile>
        ))}
        <ViewMovieInfo
          forwardedRef={childRef}
          handleClose={handleClose}
          show={show}
          item={item}
          onMovieAdd={props.onMovieAdd}
        />
      </GridList>
    </div>
  );
};

export default withWidth()(MovieList);
