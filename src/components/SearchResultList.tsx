import { FC, useRef } from "react";
import { MovieJsonEntry } from "../App";
import SearchResultItem from "./SearchResultItem";
import classes from "./SearchResultList.module.css";
import spinner from "../graphic/Dual Ring-1s-200px.svg";

const SearchResultList: FC<{
  madeNoSearch: boolean;
  queryResult: MovieJsonEntry[] | undefined;
  isLoading: boolean;
  hasNoMoreResults: boolean;
  loadMoreHandler: () => void;
  gotNetworkError: boolean;
}> = props => {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const queryResultMovieEntries = props.queryResult ? props.queryResult : [];

  return (
    <>
      {props.gotNetworkError ? (
        <div className={`container ${classes.searchErrorPlaceholder}`}>
          Oops, a network error has occured while trying to fetch movies. Please try this service at a later time!
        </div>
      ) : props.isLoading ? (
        <div className={`container flex ${classes.spinnerContainer}`}>
          <img src={spinner} alt="loading content" className={classes.spinner} />
        </div>
      ) : props.madeNoSearch ? (
        <div className={`container ${classes.searchResultsPlaceholder}`}>Search now to find flicks that you'll love.</div>
      ) : queryResultMovieEntries.length === 0 ? (
        <div className={`container ${classes.searchResultsPlaceholder}`}>No result has been found.</div>
      ) : (
        <div className={`container flex-column ${classes.searchResults}`}>
          {queryResultMovieEntries.map(movieEntry => (
            <SearchResultItem key={movieEntry.id} movieEntry={movieEntry} />
          ))}
        </div>
      )}
      {queryResultMovieEntries.length > 0 && !props.gotNetworkError && !props.madeNoSearch && !props.hasNoMoreResults && (
        <button
          className={classes.loadMore}
          ref={loadMoreButtonRef}
          onClick={e => {
            props.loadMoreHandler();
            setTimeout(() => loadMoreButtonRef.current?.scrollIntoView(false), 200);
          }}
        >
          Load More Results
        </button>
      )}
      {queryResultMovieEntries.length > 0 && !props.gotNetworkError && !props.madeNoSearch && props.hasNoMoreResults && (
        <div className={classes.endOfResults}>End of Results</div>
      )}
    </>
  );
};

export default SearchResultList;
