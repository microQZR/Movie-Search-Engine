import { FC } from "react";
import classes from "./SearchBar.module.css";

const SearchBar: FC<{
  searchMovie: (e: React.FormEvent) => void;
  searchTerm: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classList: string;
}> = props => {
  return (
    <form onSubmit={props.searchMovie} className={`flex ${classes.searchControl} ${props.classList}`}>
      <input
        type="text"
        value={props.searchTerm}
        onChange={props.onInputChange}
        placeholder="Search..."
        className={classes.searchInput}
      />
      <button className={classes.searchSubmit}></button>
    </form>
  );
};

export default SearchBar;
