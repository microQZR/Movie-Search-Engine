import React, { useState, FC } from "react";

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

const App: FC = () => {
  const [queryResult, setQueryResult] = useState<MovieJsonEntry[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [madeNoSearch, setMadeNoSearch] = useState(true);

  async function searchMovie(e: React.FormEvent) {
    e.preventDefault();
    if (searchTerm === "") return;
    setMadeNoSearch(false);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
      );
      const data = await response.json();

      setQueryResult(data.results);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <FixedTopSearchBar searchMovie={searchMovie} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={`flex-column space-between ${classes.contentContainer}`}>
        <SearchResultList madeNoSearch={madeNoSearch} queryResult={queryResult} />
        <Footer />
      </div>
    </>
  );
};

export default App;
