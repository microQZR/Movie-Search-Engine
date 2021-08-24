import React, { useState, useRef, FC, useEffect } from "react";

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

const fetchBaseUrl = process.env.REACT_APP_PROXY_URL
  ? process.env.REACT_APP_PROXY_URL + "?"
  : `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&include_adult=false&`;

const App: FC = () => {
  const [queryResult, setQueryResult] = useState<MovieJsonEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [madeNoSearch, setMadeNoSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoMoreResults, setHasNoMoreResults] = useState(true);
  const [rawQueryResult, setRawQueryResult] = useState<RawQueryResult>();
  const [gotNetworkError, setGotNetworkError] = useState(false);
  const timeoutId = useRef<number>();

  useEffect(() => () => window.clearTimeout(timeoutId.current), []);

  async function fetchMovies(value?: string) {
    value = value ?? searchTerm;

    if (value === "") {
      setMadeNoSearch(true);
      return;
    } else setMadeNoSearch(false);

    setGotNetworkError(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${fetchBaseUrl}page=1&query=${value}`);
      const data = await response.json();

      setRawQueryResult(data);
      setQueryResult(data.results);
    } catch (err) {
      setGotNetworkError(true);
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

    setGotNetworkError(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${fetchBaseUrl}page=${rawQueryResult!.page + 1}&query=${searchTerm}`);
      const data = await response.json();

      setRawQueryResult(data);

      // Prevent duplicate entries when 1st element of new query is the same as the last element of the last query
      if (data.results[0].id === queryResult[queryResult.length - 1]?.id) data.results.shift();

      setQueryResult(queryResult.concat(data.results));
    } catch (err) {
      setGotNetworkError(true);
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
          gotNetworkError={gotNetworkError}
        />
        <Footer />
      </div>
    </>
  );
};

export default App;
