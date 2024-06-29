import "./SearchBox.css";

const SearchBox = ({ searchValue, setSearchValue, setPage }) => {
  return (
    <div className="search">
      <input
        className="searchInput"
        type="text"
        placeholder="Search movie"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
          setPage(2);
        }}
      />
    </div>
  );
};

export default SearchBox;
