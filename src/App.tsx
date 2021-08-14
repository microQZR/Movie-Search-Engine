import React, { useState, useRef, FC } from "react";

import FixedTopSearchBar from "./components/FixedTopSearchBar";
import Footer from "./components/Footer";
import SearchResultList from "./components/SearchResultList";
import classes from "./App.module.css";

export type MovieJsonEntry = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

type RawQueryResult = {
  page: number;
  results: MovieJsonEntry[];
  total_pages: number;
  total_results: number;
};

const App: FC = () => {
  const [queryResult, setQueryResult] = useState<MovieJsonEntry[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [madeNoSearch, setMadeNoSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoMoreResults, setHasNoMoreResults] = useState(true);
  const [rawQueryResult, setRawQueryResult] = useState<RawQueryResult>();
  const timeoutId = useRef<number>();

  async function fetchMovies(value?: string) {
    value = value ?? searchTerm;

    if (value === "") {
      setMadeNoSearch(true);
      return;
    } else setMadeNoSearch(false);

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${value}`
      );
      const data = await response.json();

      setRawQueryResult(data);
      setQueryResult(data.results);
    } catch (err) {
      console.log(err);
    }

    setHasNoMoreResults(false);
    setIsLoading(false);
  }

  function searchMovie(e: React.FormEvent) {
    e.preventDefault();
    fetchMovies();
  }

  function searchBarInputOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);

    // Instant search uses debouncing approach. Action triggered after 200ms of inactivity.
    window.clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => fetchMovies(e.target.value), 200);
  }

  async function loadMoreHandler() {
    if (rawQueryResult!.page >= rawQueryResult!.total_pages) {
      setHasNoMoreResults(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${
          rawQueryResult!.page + 1
        }&include_adult=false&query=${searchTerm}`
      );
      const data = await response.json();

      setRawQueryResult(data);
      setQueryResult(queryResult?.concat(data.results));
    } catch (err) {
      console.log(err);
    }

    setHasNoMoreResults(false);
    setIsLoading(false);
  }

  return (
    <>
      <FixedTopSearchBar searchMovie={searchMovie} searchTerm={searchTerm} onInputChange={searchBarInputOnChangeHandler} />
      <div className={`flex-column space-between ${classes.contentContainer}`}>
        <SearchResultList
          madeNoSearch={madeNoSearch}
          queryResult={queryResult}
          isLoading={isLoading}
          hasNoMoreResults={hasNoMoreResults}
          loadMoreHandler={loadMoreHandler}
        />
        <Footer />
      </div>
    </>
  );
};

export default App;
