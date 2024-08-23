import { useEffect, useState } from "react";

let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
};

const MovieFavourite = () => {
    const [favourites,setfavourites] = useState([]);

    useEffect(()=>{
        const favouritesData = localStorage.getItem("favourites") || "[]";
        setfavourites(JSON.parse(favouritesData));
        
    },[]);

    const removeFromFavourites = (movieId) => {
        const updatedFavourites = favourites.filter(fav => fav.id !== movieId);
        setfavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    };

    return (
        <>
        <h1>Favourite Movies</h1>
        <div className="favourite-wrapper">
            <div className="left-section"></div>
            <div className="right-section">
                <table>
                    <thead>
                        <tr> 
                            <th>Image</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Popularity</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favourites.map((favourite)=>(
                                <tr>
                                    <td> <img src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}`} style={{width:"80px"}} alt=""></img> </td>
                                    <td>{favourite.title}</td>
                                    <td>{genreids[favourite.genre_ids[0]]}</td> 
                                    <td>{favourite.popularity}</td>
                                    <td>{favourite.vote_average}</td>
                                    <td>
                                        <div className="deleteBtn" onClick={() => removeFromFavourites(favourite.id)}>
                                            Delete
                                        </div>
                                    </td> 
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default MovieFavourite ; 