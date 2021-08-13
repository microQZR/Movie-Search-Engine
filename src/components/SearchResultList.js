import SearchResultItem from "./SearchResultItem";
import classes from "./SearchResultList.module.css";

function SearchResultList(props) {
  const queryResultMovieEntries = props.queryResult ? props.queryResult.results : [];

  return (
    <div className={`${classes.resultList} ${props.classList}`}>
      {queryResultMovieEntries.map(movieEntry => (
        <SearchResultItem key={movieEntry.id} movieEntry={movieEntry} />
      ))}
    </div>
  );
}

export default SearchResultList;
