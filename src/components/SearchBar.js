import classes from "./SearchBar.module.css";

function SearchBar(props) {
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
}

export default SearchBar;
