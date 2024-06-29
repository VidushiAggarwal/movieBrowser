import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import SearchBox from "./components/SearchBox/SearchBox";
import MovieListHeading from "./components/MovieListHeading/MovieListHeading";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Spinner from "./components/Spinner/Spinner";

//https://www.omdbapi.com/
//https://www.omdbapi.com/?i=tt3896198&apikey=ae4b272d
//https://www.omdbapi.com/?s=star%20wars&apikey=ae4b272d

//https://www.youtube.com/watch?v=jc9_Bqzy2YQ

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("Star");
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=ae4b272d&s=${searchValue}&page=1`
    );
    const movies = await response.json();
    if (movies.Response === "True") {
      setMovies(movies.Search);
      setError("");
      setLoading(false);
    } else {
      setMovies([]);
      setLoading(false);
      setError(movies.Error);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="App">
      <div className="navbar">
        <MovieListHeading heading="Movie Browser" />
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setPage={setPage}
        />
      </div>
      {movies.length > 0 && (
        <MovieList
          searchValue={searchValue}
          movies={movies}
          setMovies={setMovies}
          page={page}
          setPage={setPage}
          setError={setError}
        />
      )}
      {error && <ErrorPage error={error} />}
      {loading && <Spinner />}
    </div>
  );
}

export default App;
