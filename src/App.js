import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import SearchBox from "./components/SearchBox/SearchBox";
import MovieListHeading from "./components/MovieListHeading/MovieListHeading";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Spinner from "./components/Spinner/Spinner";
import FavMovieList from "./components/FavMovieList/FavMovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(true);
  const movie = searchValue || "Star";
  const [favMovie, setFavMovie] = useState([]);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=ae4b272d&s=${movie}&page=1`
    );
    const movieResponse = await response.json();
    if (movieResponse.Response === "True") {
      setMovies(movieResponse.Search);
      setError("");
      setLoading(false);
    } else {
      setMovies([]);
      setLoading(false);
      setError(movieResponse.Error);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavMovie(movieFavourites);
    }
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <h2>Movie Browser</h2>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setPage={setPage}
        />
      </div>
      {favMovie.length > 0 && (
        <>
          <MovieListHeading heading="Favourites" />
          <FavMovieList favMovie={favMovie} setFavMovie={setFavMovie} />
        </>
      )}
      {movies.length > 0 && (
        <>
          <MovieListHeading heading="Movies" />
          <MovieList
            searchValue={movie}
            movies={movies}
            setMovies={setMovies}
            page={page}
            setPage={setPage}
            setError={setError}
            favMovie={favMovie}
            setFavMovie={setFavMovie}
          />
        </>
      )}
      {error && <ErrorPage error={error} />}
      {loading && <Spinner />}
    </div>
  );
}

export default App;
