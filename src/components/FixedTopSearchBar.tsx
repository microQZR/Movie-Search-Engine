import { FC } from "react";
import classes from "./FixedTopSearchBar.module.css";
import SearchBar from "./SearchBar";

const FixedTopSearchBar: FC<{
  searchMovie: (e: React.FormEvent) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}> = props => {
  return (
    <div className={classes.searchBarFrame}>
      <SearchBar
        searchMovie={props.searchMovie}
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
        classList={`container ${classes.searchBar}`}
      />
    </div>
  );
};

export default FixedTopSearchBar;
