import { FC } from "react";
import { MovieJsonEntry } from "../App";
import SearchResultItem from "./SearchResultItem";
import classes from "./SearchResultList.module.css";
import spinner from "../graphic/Dual Ring-1s-200px.svg";

const SearchResultList: FC<{ madeNoSearch: boolean; queryResult: MovieJsonEntry[] | undefined; isLoading: boolean }> = props => {
  const queryResultMovieEntries = props.queryResult ? props.queryResult : [];

  return props.isLoading ? (
    <div className={`container flex ${classes.spinnerContainer}`}>
      <img src={spinner} alt="loading content" className={classes.spinner} />
    </div>
  ) : props.madeNoSearch ? (
    <div className={`container ${classes.searchResultsPlaceholder}`}>Search now to find flicks that you'll love.</div>
  ) : queryResultMovieEntries.length === 0 ? (
    <div className={`container ${classes.searchResultsPlaceholder}`}>No result has been found.</div>
  ) : (
    <div className={`container ${classes.searchResults}`}>
      {queryResultMovieEntries.map(movieEntry => (
        <SearchResultItem key={movieEntry.id} movieEntry={movieEntry} />
      ))}
    </div>
  );
};

export default SearchResultList;
