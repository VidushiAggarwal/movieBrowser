import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";
import List from "../List/List";

const MovieList = ({
  searchValue,
  movies,
  setMovies,
  page,
  setPage,
  setError,
  favMovie,
  setFavMovie,
}) => {
  const [spinner, showSpinner] = useState(false);

  const fetchMoreData = async () => {
    showSpinner(true);
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=ae4b272d&s=${searchValue}&page=${page}`
    );
    const moviesResponse = await response.json();
    if (moviesResponse.Response === "True") {
      setMovies([...movies, ...moviesResponse.Search]);
      setError("");
    }
    showSpinner(false);
    setPage(page + 1);
  };

  const addFavouriteMovie = (movie) => {
    const id = movie.currentTarget.parentElement.id;
    const selectedMovie = movies.filter((movie) => movie.imdbID === id);

    const existingMovie = favMovie.filter(
      (movie) => movie.imdbID === selectedMovie[0].imdbID
    );
    if (existingMovie.length === 0) {
      const newFavouriteList = [...favMovie, ...selectedMovie];
      setFavMovie(newFavouriteList);
      localStorage.setItem(
        "react-movie-app-favourites",
        JSON.stringify(newFavouriteList)
      );
    }
  };

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={page <= 5 && fetchMoreData}
      hasMore={page <= 5 ? true : false}
      loader={spinner && <Spinner />}
    >
      <List
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favMovie={favMovie}
      />
    </InfiniteScroll>
  );
};

export default MovieList;
