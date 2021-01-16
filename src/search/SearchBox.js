import React, { useState, useEffect } from "react";
import { Input, Button, TextField, Grid } from "@material-ui/core";
import { searchMovies } from "../shared/API";
import MovieList from "../movieList/MovieList";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "30%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginTop: 80,
    height: "100%",
  },

  searchBox: {
    width: "100%",
    position: "relative",
    display: "flex",
  },

  input: {
    width: "100%",
    minWidth: 90,
    border: "2px solid #b8a9c9",
    borderRight: "none",
    padding: 12,
    height: 10,
    borderRadius: "5px 0 0 5px",
    outline: "none",
  },

  myBtn: {
    width: 40,
    height: 38,
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
    border: "2px solid #b8a9c9",
    color: "white",
    backgroundColor: "#b8a9c9",
    "&:hover": {
      backgroundColor: theme.palette.action.hoverOpacity,
      opacity: "0.4",
    },
  },
}));

const SearchBox = (props) => {
  const classes = useStyles();
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const localMovieAdd = (movie) => {
    setMovies([]);
    props.onMovieAdd(movie);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.searchBox}>
          <input
            variant="outlined"
            className={classes.input}
            placeholder="Search for a movie"
            value={term}
            style={{ borderRight: "none" }}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
          <button
            className={classes.myBtn}
            onClick={() => {
              searchMovies(term).then((res) => setMovies(res.data.results));
              setTerm("");
            }}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <div style={{ marginTop: "90px" }}>
        <MovieList
          viewMovieInfo={props.viewMovieInfo}
          movies={movies}
          onMovieAdd={localMovieAdd}
        />
      </div>
    </div>
  );
};

export default SearchBox;
