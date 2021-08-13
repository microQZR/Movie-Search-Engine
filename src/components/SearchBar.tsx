import { FC } from "react";
import classes from "./SearchBar.module.css";

const SearchBar: FC<{
  searchMovie: (e: React.FormEvent) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  classList: string;
}> = props => {
  return (
    <form onSubmit={props.searchMovie} className={`flex ${classes.searchControl} ${props.classList}`}>
      <input
        type="text"
        value={props.searchTerm}
        onChange={e => props.setSearchTerm(e.target.value)}
        placeholder="Search..."
        className={classes.searchInput}
      />
      <button className={classes.searchSubmit}></button>
    </form>
  );
};

export default SearchBar;
