import FavMovieBtn from "../FavMovieBtn/FavMovieBtn";
import "./List.css";

const List = ({ movies, handleFavouritesClick, favMovie }) => {
  return (
    <ul className="movieList">
      {movies.map((movie, index) => (
        <li key={index} id={movie.imdbID} className="movieListItem">
          <img className="movieImg" src={movie.Poster} alt={movie.Title} />
          <div className="movieTitle">{movie.Title}</div>
          <div className="movieYear">({movie.Year})</div>
          <FavMovieBtn
            handleFavouritesClick={handleFavouritesClick}
            favMovie={favMovie}
            movie={movie}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
