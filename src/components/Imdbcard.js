import { Link } from "react-router-dom";

const Imdbcard = ({movie}) => {
    
    return (
        <div className="movie-card">
            <div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
            <Link to={`/Movie-Detail/${movie.id}`}>
            <h5>{movie.title}</h5></Link>  
            </div>
            
        </div>
    )
}
export default Imdbcard ;