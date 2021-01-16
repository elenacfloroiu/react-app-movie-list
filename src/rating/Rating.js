import React, { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/StarOutlined";
import "./Rating.css";

const Rating = (props) => {
  const [rating, setRating] = useState(
    localStorage.getItem(props.movie.id) || ""
  );

  useEffect(() => {
    localStorage.setItem(props.movie.id, rating);
  }, [rating]);

  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <StarIcon
              style={
                ratingValue <= (hover || rating)
                  ? { fill: "#ffc107" }
                  : { fill: "#c9c8c5" }
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
