import { FC } from "react";
import { MovieJsonEntry } from "../App";
import classes from "./SearchResultItem.module.css";

const SearchResultItem: FC<{ movieEntry: MovieJsonEntry }> = props => {
  return (
    <div className={`flex ${classes.resultItem}`}>
      <img
        alt="movie poster"
        src={"https://image.tmdb.org/t/p/w500" + props.movieEntry.poster_path}
        className={classes.moviePoster}
      />
      <div className={`flex-column ${classes.movieDetail}`}>
        <div className={classes.movieTitle}>{props.movieEntry.title}</div>
        <div className={classes.movieDesc}>{props.movieEntry.overview}</div>
      </div>
    </div>
  );
};

export default SearchResultItem;
