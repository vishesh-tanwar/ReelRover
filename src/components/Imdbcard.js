import { Link } from "react-router-dom";

const Imdbcard = ({ movie, onwatchlistupdate, watchlist }) => {
  const ismovieadded = watchlist.find(
    (watchlistmovie) => watchlistmovie.id === movie.id
  );
  const addtowatchlist = (e) => {
    onwatchlistupdate((prevwatchlist) => {
      let updatedWatchlist;
      if (ismovieadded) {
        updatedWatchlist = prevwatchlist.filter(
          (watchlistMovie) => watchlistMovie.id !== movie.id
        );
      } else {
        updatedWatchlist = [...prevwatchlist, movie];
      }
      localStorage.setItem("favourites", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  return (
    <div className="movie-card">
      <div>
        <Link to={`Movie-Detail/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
        </Link>
        <div>
          <Link to={`/Movie-Detail/${movie.id}`} className="movie-name">{movie.title}</Link>
        </div> 
        <h5>${movie.price}</h5>
        <button data-id={movie.id} onClick={addtowatchlist} style={{backgroundColor : ismovieadded? "rgb(240,101,101)" : "" , border:"1px solid black" , borderRadius:"3px"}}>
          {ismovieadded ? "Remove from watchlist" : "Add to watchlist"}
        </button>
      </div>
    </div>
  );
};
export default Imdbcard;
