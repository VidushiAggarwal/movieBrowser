import "./FavMovieBtn.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

const FavMovieBtn = ({ handleFavouritesClick, favMovie, movie }) => {
  const ifFavMovie = favMovie.filter(fav => fav.imdbID === movie.imdbID);

  return (
    <button className="favBtn" onClick={handleFavouritesClick}>
      <FontAwesomeIcon icon={ifFavMovie.length > 0 ? faHeartSolid : faHeartReg} className="heartIcon" />
      <p>Add to favourites</p>
    </button>
  );
};

export default FavMovieBtn;
