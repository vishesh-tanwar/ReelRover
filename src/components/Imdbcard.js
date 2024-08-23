import { Link } from "react-router-dom";

const Imdbcard = ({movie ,onwatchlistupdate , watchlist}) => {

    const ismovieadded = watchlist.find(watchlistmovie => watchlistmovie.id === movie.id )
    const addtowatchlist = (e) => { 
        onwatchlistupdate((prevwatchlist) => {
            let updatedWatchlist;
            if (ismovieadded) {
                updatedWatchlist = prevwatchlist.filter(watchlistMovie => watchlistMovie.id !== movie.id);
            } else {
                updatedWatchlist = [...prevwatchlist, movie];
            }
            localStorage.setItem("favourites", JSON.stringify(updatedWatchlist));
            return updatedWatchlist;
        }) ; 
    }
    
    return (
        <div className="movie-card">
            <div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
            <Link to={`/Movie-Detail/${movie.id}`}>
            <h5>{movie.title}</h5></Link>  
            <button data-id={movie.id} onClick={addtowatchlist} >
                {ismovieadded ? "remove from watchlist" : "Add to watchlist"}
            </button>
            </div>  
        </div>
    )
}
export default Imdbcard ;