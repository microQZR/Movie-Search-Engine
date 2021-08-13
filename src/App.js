import { useState } from "react";

import classes from "./App.module.css";
import SearchBar from "./components/SearchBar";
import SearchResultList from "./components/SearchResultList";

function App() {
  const [queryResult, setQueryResult] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [madeNoSearch, setMadeNoSearch] = useState(true);

  async function searchMovie(e) {
    e.preventDefault();
    if (searchTerm === "") return;
    setMadeNoSearch(false);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
      );
      const data = await response.json();

      console.log(data); // DEBUG
      setQueryResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={classes.searchBarFrame}>
        <SearchBar
          searchMovie={searchMovie}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          classList={`${classes.container} ${classes.searchBar}`}
        />
      </div>
      {madeNoSearch ? (
        <div className={`${classes.container} ${classes.searchResultsPlaceholder}`}>
          Search now to find flicks that you'll love.
        </div>
      ) : (
        <SearchResultList queryResult={queryResult} classList={`${classes.container} ${classes.searchResults}`} />
      )}
    </>
  );
}

export default App;
