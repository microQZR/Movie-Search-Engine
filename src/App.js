import { useState } from "react";

import FixedTopSearchBar from "./components/FixedTopSearchBar";
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

      setQueryResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <FixedTopSearchBar searchMovie={searchMovie} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResultList madeNoSearch={madeNoSearch} queryResult={queryResult} />
    </>
  );
}

export default App;
