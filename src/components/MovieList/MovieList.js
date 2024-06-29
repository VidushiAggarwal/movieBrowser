import "./MovieList.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";

const MovieList = ({
  searchValue,
  movies,
  setMovies,
  page,
  setPage,
  setError,
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

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={page <= 5 && fetchMoreData}
      hasMore={page <= 5 ? true : false}
      loader={spinner && <Spinner />}
    >
      <ul className="movieList">
        {movies.map((movie, index) => (
          <li key={index} className="movieListItem">
            <img className="movieImg" src={movie.Poster} alt={movie.Title} />
            <div className="movieTitle">{movie.Title}</div>
            <div className="movieYear">{movie.Year}</div>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default MovieList;
