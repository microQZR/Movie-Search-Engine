import { FC } from "react";
import classes from "./FixedTopSearchBar.module.css";
import SearchBar from "./SearchBar";

const FixedTopSearchBar: FC<{
  searchMovie: (e: React.FormEvent) => void;
  searchTerm: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = props => {
  return (
    <div className={classes.searchBarFrame}>
      <SearchBar
        searchMovie={props.searchMovie}
        searchTerm={props.searchTerm}
        onInputChange={props.onInputChange}
        classList={`container ${classes.searchBar}`}
      />
    </div>
  );
};

export default FixedTopSearchBar;
