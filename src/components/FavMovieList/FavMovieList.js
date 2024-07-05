import List from "../List/List";

const FavMovieList = ({ favMovie, setFavMovie }) => {
  const removeFavouriteMovie = (movie) => {
    const id = movie.currentTarget.parentElement.id;
    const newFavouriteList = favMovie.filter(
      (favourite) => favourite.imdbID !== id
    );
    setFavMovie(newFavouriteList);
    localStorage.setItem(
      "react-movie-app-favourites",
      JSON.stringify(newFavouriteList)
    );
  };

  return (
    <>
      <List
        movies={favMovie}
        handleFavouritesClick={removeFavouriteMovie}
        favMovie={favMovie}
      />
    </>
  );
};

export default FavMovieList;
